import { all, call, put, take } from '@redux-saga/core/effects';
import {
  REQUEST_DATA,
  START_REQUEST,
  RECEIVE_DATA,
  SET_TITLE,
  RECEIVE_NEW_TITLE,
  RECEIVE_ARTICLES,
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CATCH_ERROR,
  SET_DEFAULT,
} from './types';
import * as services from './services';

function* mainProvider() {
  const data = yield call(services.initApp);
  yield put({
    type: RECEIVE_DATA,
    payload: {
      title: data.title,
      articles: data.articles,
    },
  });
}

function* newTitleHandler(title) {
  yield call(services.changeTitle, title);
  const newTitle = yield call(services.getTitle);
  yield put({ type: RECEIVE_NEW_TITLE, payload: newTitle });
}
// зачем вообще getTitle
// function* newTitleHandler(title) {
//   yield call(services.changeTitle, title);
//   yield put({ type: RECEIVE_NEW_TITLE, payload: title });
// };

function* articlesProvider() {
  const articles = yield call(services.getArticles);
  yield put({ type: RECEIVE_ARTICLES, payload: articles });
}

function* newArticleHandler(article) {
  yield call(services.postArticle, article);
  yield call(articlesProvider);
}

function* editArticleHandler(article, id) {
  yield call(services.putArticle, article, id);
  yield call(articlesProvider);
}

function* deleteArticleHandler(id) {
  yield call(services.deleteArticle, id);
  yield call(articlesProvider);
}

const connectionCounter = (func, ...args) => {
  let counter = 0;
  return function* crossConnectionManager() {
    try {
      yield put({ type: START_REQUEST });
      counter++;
      yield call(func, ...args);
      counter--;
      if (!counter) yield put({ type: SET_DEFAULT });
    } catch (err) {
      counter--;
      yield put({ type: CATCH_ERROR, err });
    }
  };
};

const requestMiddleware = connectionCounter();

function* newTitleWatcher() {
  const title = take(SET_TITLE);
  yield call(requestMiddleware, newTitleHandler, title);
}

function* refreshWatcher() {
  take(REQUEST_DATA);
  yield call(requestMiddleware, mainProvider);
}

function* newArticleWatcher() {
  const article = take(SEND_NEW_ARTICLE);
  yield call(requestMiddleware, newArticleHandler, article);
}

function* editArticleWatcher() {
  const { article, id } = take(UPDATE_ARTICLE);
  yield call(requestMiddleware, editArticleHandler, article, id);
}

function* deleteArticleWatcher() {
  const id = take(DELETE_ARTICLE);
  yield call(requestMiddleware, deleteArticleHandler, id);
}

function* rootCalendarSaga() {
  yield all([
    newTitleWatcher(),
    refreshWatcher(),
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
    mainProvider(),
  ]);
}

export default rootCalendarSaga;

// try {
//   const data = yield call(connectRemote, body, id);
//   yield put({type: RECEIVE_DATA, payload: data});
//   yield put({type: SET_DEFAULT});
// } catch (err) {
//   yield put({type: CATCH_ERROR, payload: err});
// }
