import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  actionChannel,
  cancelled,
} from '@redux-saga/core/effects';
import { buffers } from 'redux-saga';
import {
  REQUEST_DATA,
  START_REQUEST,
  SET_TITLE,
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CATCH_ERROR,
  END_REQUEST,
} from './types';
import {
  getData,
  getTitle,
  getArticles,
  changeTitle,
  postArticle,
  putArticle,
  deleteArticle,
} from './services';
import {
  startRequest,
  endRequest,
  receiveData,
  receiveTitle,
  receiveArticles,
  reportError,
  catchError,
  setDefault,
} from './actions';

const counterManager = (action, counter) => {
  let newCounter = counter;
  if (action.type === START_REQUEST) return ++newCounter;
  if (action.type === END_REQUEST) return --newCounter;
  return newCounter;
};

const crossConnectionCounter = () => {
  let counter = 0;
  return function* crossConnectionController() {
    const errorBuffer = buffers.none();
    const errorChan = yield actionChannel(CATCH_ERROR, errorBuffer);
    while (errorBuffer.isEmpty()) {
      const action = yield take([START_REQUEST, END_REQUEST, CATCH_ERROR]);
      yield call(counterManager, action, counter);
      console.log(counter);
      if (!counter) yield put(setDefault());
    }
    while (!counter) {
      yield take(END_REQUEST);
      counter--;
    }
    const { err } = yield take(errorChan);
    yield put(reportError(err));
  };
};
const crossConnectionManager = crossConnectionCounter();

function* crossConnectionWatcher() {
  yield takeEvery(
    [START_REQUEST, END_REQUEST, CATCH_ERROR],
    crossConnectionManager
  );
}

function* mainProvider() {
  try {
    console.log('start');
    // debugger;
    yield put(startRequest());
    const data = yield call(getData);
    console.log(data);

    yield put(receiveData(data.title, data.articles));
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  } finally {
    if (yield cancelled()) yield put(endRequest());
  }
}

function* articlesProvider() {
  try {
    yield put(startRequest());
    const articles = yield call(getArticles);
    yield put(receiveArticles(articles));
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* newTitleHandler() {
  try {
    yield put(startRequest());
    const { title } = yield take(SET_TITLE);
    yield call(changeTitle, title);
    const newTitle = yield call(getTitle);
    yield put(receiveTitle(newTitle));
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* newArticleHandler() {
  try {
    yield put(startRequest());
    const { article } = yield take(SEND_NEW_ARTICLE);
    yield call(postArticle, article);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* editArticleHandler() {
  try {
    yield put(startRequest());
    const { article, id } = yield take(UPDATE_ARTICLE);
    yield call(putArticle, article, id);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* deleteArticleHandler() {
  try {
    yield put(startRequest());
    const { id } = yield take(DELETE_ARTICLE);
    yield call(deleteArticle, id);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* newTitleWatcher() {
  while (true) {
    yield takeEvery(SET_TITLE, newTitleHandler);
  }
}

function* refreshWatcher() {
  while (true) {
    yield takeLatest(REQUEST_DATA, mainProvider);
  }
}

function* newArticleWatcher() {
  while (true) {
    yield takeEvery(SEND_NEW_ARTICLE, newArticleHandler);
  }
}

function* editArticleWatcher() {
  while (true) {
    yield takeEvery(UPDATE_ARTICLE, editArticleHandler);
  }
}

function* deleteArticleWatcher() {
  while (true) {
    yield takeEvery(DELETE_ARTICLE, deleteArticleHandler);
  }
}

function* rootCalendarSaga() {
  yield all([
    crossConnectionWatcher(),
    newTitleWatcher(),
    refreshWatcher(),
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
    mainProvider(), // init
  ]);
}

export default rootCalendarSaga;
