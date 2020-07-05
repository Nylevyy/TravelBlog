import {
  all,
  call,
  put,
  fork,
  take,
  takeLatest,
  cancelled,
} from '@redux-saga/core/effects';
import {
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  REFRESH_ARTICLES,
} from './types';
import {
  getData,
  getArticles,
  postArticle,
  putArticle,
  deleteArticle,
} from './services';
import { receiveArticles, receiveData } from './actions';
import { appActions } from '../app';

const { setDefault, startRequest, endRequest, reportError } = appActions;

function* mainCalendarProvider() {
  try {
    yield put(startRequest());
    const { title, articles } = yield call(getData);
    yield put(receiveData({ title, articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  } finally {
    if (yield cancelled()) yield put(endRequest());
  }
}

function* articlesProvider() {
  try {
    yield put(startRequest());
    const { articles } = yield call(getArticles);
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* refreshHandler() {
  try {
    yield put(startRequest());
    const { articles } = yield call(getArticles);
    yield put(setDefault());
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* newArticleHandler(article) {
  try {
    yield put(startRequest());
    yield call(postArticle, { data: article });
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* editArticleHandler(article, id) {
  try {
    yield put(startRequest());
    yield call(putArticle, { data: article, params: { id } });
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* deleteArticleHandler(id) {
  try {
    yield put(startRequest());
    yield call(deleteArticle, { params: { id } });
    yield call(articlesProvider);
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* refreshWatcher() {
  yield takeLatest(REFRESH_ARTICLES, refreshHandler);
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
    mainCalendarProvider(),
  ]);
}

export default rootCalendarSaga;
