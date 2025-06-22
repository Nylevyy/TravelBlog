import { all, put, takeLatest } from 'redux-saga/effects';
import { receiveConfig } from '~/entities/user-config';
import { receiveArticles } from '~/entities/article';
import { initializePage } from './actions';

function* initializeWorker() {
  yield put(receiveConfig());
  yield put(receiveArticles());
}

function* initializeWatcher() {
  yield takeLatest(initializePage.type, initializeWorker);
}

function* rootMainPageSaga() {
  yield all([initializeWatcher()]);
}

export default rootMainPageSaga;
