import { all, call, put, fork, take } from '@redux-saga/core/effects';
import {
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  REFRESH_ARTICLES,
} from './types';
import {
  getArticles,
  postArticle,
  putArticle,
  deleteArticle,
} from './services';
import { receiveArticles } from './actions';

function* articlesProvider() {
  const { articles } = yield call(getArticles);
  yield put(receiveArticles({ articles }));
}

function* newArticleHandler(article) {
  yield call(postArticle, { data: article });
  yield call(articlesProvider);
}

function* editArticleHandler(article, id) {
  yield call(putArticle, { data: article, params: { id } });
  yield call(articlesProvider);
}

function* deleteArticleHandler(id) {
  yield call(deleteArticle, { params: { id } });
  yield call(articlesProvider);
}

function* refreshWatcher() {
  while (true) {
    yield take(REFRESH_ARTICLES);
    yield fork(articlesProvider);
  }
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
    refreshWatcher(),
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
  ]);
}

export default rootCalendarSaga;
