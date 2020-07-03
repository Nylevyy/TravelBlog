import {
  all,
  call,
  put,
  fork,
  take,
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
  if (action.type === 'START_REQUEST') return ++newCounter;
  if (action.type === 'END_REQUEST') return --newCounter;
  return newCounter;
};

const crossConnectionCounter = () => {
  let counter = 0;
  return function* crossConnectionController() {
    while (true) {
      const errorBuffer = buffers.expanding(5);
      const errorChan = yield actionChannel(CATCH_ERROR, errorBuffer);
      while (errorBuffer.isEmpty()) {
        const action = yield take([START_REQUEST, END_REQUEST, CATCH_ERROR]);
        counter = yield call(counterManager, action, counter);
        if (!counter) yield put(setDefault());
      }
      while (counter) {
        yield take(END_REQUEST);
        counter--;
      }
      while (!errorBuffer.isEmpty()) {
        const { err } = yield take(errorChan);
        yield put(reportError(err));
      }
    }
  };
};
const crossConnectionManager = crossConnectionCounter();

function* mainProvider() {
  try {
    yield put(startRequest());
    const data = yield call(getData);
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

function* newTitleHandler(title) {
  try {
    yield put(startRequest());
    yield call(changeTitle, title);
    const newTitle = yield call(getTitle);
    yield put(receiveTitle(newTitle));
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* newArticleHandler(article) {
  try {
    yield put(startRequest());
    yield call(postArticle, article);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* editArticleHandler(article, id) {
  try {
    yield put(startRequest());
    yield call(putArticle, article, id);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* deleteArticleHandler(id) {
  try {
    yield put(startRequest());
    yield call(deleteArticle, id);
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(catchError(err));
  }
}

function* newTitleWatcher() {
  while (true) {
    const { title } = yield take(SET_TITLE);
    yield fork(newTitleHandler, title);
  }
}

function* refreshWatcher() {
  yield takeLatest(REQUEST_DATA, mainProvider);
}

function* newArticleWatcher() {
  while (true) {
    const { article } = yield take(SEND_NEW_ARTICLE);
    yield fork(newArticleHandler, article);
  }
}

function* editArticleWatcher() {
  while (true) {
    const { article, id } = yield take(UPDATE_ARTICLE);
    yield fork(editArticleHandler, article, id);
  }
}

function* deleteArticleWatcher() {
  while (true) {
    const { id } = yield take(DELETE_ARTICLE);
    yield fork(deleteArticleHandler, id);
  }
}

function* rootCalendarSaga() {
  yield all([
    newTitleWatcher(),
    refreshWatcher(),
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
    crossConnectionManager(),
    mainProvider(), // init
  ]);
}

export default rootCalendarSaga;
