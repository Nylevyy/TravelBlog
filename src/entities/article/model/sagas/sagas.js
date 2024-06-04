import { nanoid } from '@reduxjs/toolkit';
import { all, call, put, fork, take } from '@redux-saga/core/effects';
import { startRequest, endRequest, setError } from '../slice';
import {
  CREATE_ARTICLE_ACTION,
  DELETE_ARTICLE_ACTION,
  UPDATE_ARTICLE_ACTION,
} from './constants';
import { createArticle, updateArticle, deleteArticle } from '../../api';

function* newArticleHandler(article) {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    const { article: responseArticle } = yield call(createArticle, {
      data: article,
    });
    return responseArticle;
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
    const { article: responseArticle } = yield call(updateArticle, {
      data: article,
      params: { id },
    });
    yield put(endRequest(reqId));
    return responseArticle;
  } catch (err) {
    yield put(setError(err));
    return null;
  }
}

function* deleteArticleHandler(id) {
  const reqId = nanoid();

  try {
    yield put(startRequest(reqId));
    yield call(deleteArticle, { params: { id } });
    yield put(endRequest(reqId));
  } catch (err) {
    yield put(setError(err));
  }
}

function* newArticleWatcher() {
  while (true) {
    const { article } = yield take(CREATE_ARTICLE_ACTION);
    yield fork(newArticleHandler, article);
  }
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
    editArticleWatcher(),
    deleteArticleWatcher(),
  ]);
}

export default rootArticlesSaga;
