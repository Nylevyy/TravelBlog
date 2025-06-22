import { nanoid } from '@reduxjs/toolkit';
import {
  all,
  call,
  put,
  fork,
  take,
  takeLatest,
} from '@redux-saga/core/effects';
import { endRequest, startRequest } from '~/shared/ui/loader';
import { setError, setArticles } from '../slice';
import {
  CREATE_ARTICLE_ACTION,
  DELETE_ARTICLE_ACTION,
  RECEIVE_ARTICLES_ACTION,
  UPDATE_ARTICLE_ACTION,
} from './constants';
import {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByUser,
} from '../../api';

function* receiveArticlesHandler() {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    const articles = yield call(getArticlesByUser);
    yield put(setArticles(articles));
    return articles;
  } catch (err) {
    yield put(setError(err));
    return null;
  } finally {
    yield put(endRequest(reqId));
  }
}

function* newArticleHandler(article) {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    const { articles } = yield call(createArticle, {
      data: article,
    });
    yield put(setArticles(articles));
    return articles;
  } catch (err) {
    yield put(setError(err));
    return null;
  } finally {
    yield put(endRequest(reqId));
  }
}

function* editArticleHandler(article, id) {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    const { articles } = yield call(updateArticle, id, {
      data: article,
    });
    yield put(setArticles(articles));
    return articles;
  } catch (err) {
    yield put(setError(err));
    return null;
  } finally {
    yield put(endRequest(reqId));
  }
}

function* deleteArticleHandler(id) {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    const { articles } = yield call(deleteArticle, id, {});
    yield put(setArticles(articles));
    return articles;
  } catch (err) {
    yield put(setError(err));
    return null;
  } finally {
    yield put(endRequest(reqId));
  }
}

function* newArticleWatcher() {
  while (true) {
    const { article } = yield take(CREATE_ARTICLE_ACTION);
    yield fork(newArticleHandler, article);
  }
}

function* receiveArticlesWatcher() {
  yield takeLatest(RECEIVE_ARTICLES_ACTION, receiveArticlesHandler);
}

function* editArticleWatcher() {
  while (true) {
    const { article, id } = yield take(UPDATE_ARTICLE_ACTION);
    yield fork(editArticleHandler, article, id);
  }
}

function* deleteArticleWatcher() {
  while (true) {
    const { id } = yield take(DELETE_ARTICLE_ACTION);
    yield fork(deleteArticleHandler, id);
  }
}

function* rootArticlesSaga() {
  yield all([
    newArticleWatcher(),
    receiveArticlesWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
  ]);
}

export default rootArticlesSaga;
