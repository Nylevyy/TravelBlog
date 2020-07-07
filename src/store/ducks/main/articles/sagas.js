import { all, call, put, fork, take } from '@redux-saga/core/effects';
import { SEND_NEW_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from './types';
import {
  // fetchArticles,
  postArticle,
  putArticle,
  deleteArticle,
} from './services';
import { receiveArticles } from './actions';
import { appActions } from '~/store/ducks/app';

const { startRequest, endRequest, reportError } = appActions;

// function* articlesProvider() {
//   try {
//     yield put(startRequest());
//     const { articles } = yield call(fetchArticles);
//     yield put(receiveArticles({ articles }));
//     yield put(endRequest());
//   } catch (err) {
//     yield put(reportError(err));
//   }
// }

function* newArticleHandler(article) {
  try {
    yield put(startRequest());
    const { articles } = yield call(postArticle, { data: article });
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* editArticleHandler(article, id) {
  try {
    yield put(startRequest());
    const { articles } = yield call(putArticle, {
      data: article,
      params: { id },
    });
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* deleteArticleHandler(id) {
  try {
    yield put(startRequest());
    const { articles } = yield call(deleteArticle, { params: { id } });
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
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

function* rootArticlesSaga() {
  yield all([
    newArticleWatcher(),
    editArticleWatcher(),
    deleteArticleWatcher(),
  ]);
}

export default rootArticlesSaga;
