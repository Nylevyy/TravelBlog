import { all, call, put, fork, take } from '@redux-saga/core/effects';
import {
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  REFRESH_ARTICLES,
} from './types';
import {
  fetchArticles,
  postArticle,
  putArticle,
  deleteArticle,
} from './services';
import { receiveArticles } from './actions';
import { appTypes } from '~/store/ducks/app';

const { INIT } = appTypes;

function* articlesProvider() {
  const { articles } = yield call(fetchArticles);
  yield put(receiveArticles({ articles }));
}

function* newArticleHandler(article) {
  const { articles } = yield call(postArticle, { data: article });
  yield put(receiveArticles({ articles }));
}

function* editArticleHandler(article, id) {
  const { articles } = yield call(putArticle, {
    data: article,
    params: { id },
  });
  yield put(receiveArticles({ articles }));
}

function* deleteArticleHandler(id) {
  const { articles } = yield call(deleteArticle, { params: { id } });
  yield put(receiveArticles({ articles }));
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

function* initApp() {
  yield take(INIT);
  yield fork(articlesProvider);
}

function* rootCalendarSaga() {
  yield all([
    refreshWatcher(),
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
    initApp(),
  ]);
}

export default rootCalendarSaga;
