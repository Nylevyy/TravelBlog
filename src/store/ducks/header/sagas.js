import { put, call, take, fork, all } from '@redux-saga/core/effects';
import { EDIT_TITLE, FETCH_TITLE } from './types';
import { appTypes } from '~/store/ducks/app';
import { receiveTitle } from './actions';
import { changeTitle, fetchTitle } from './services';

const { INIT } = appTypes;

function* fetchTitleHandler() {
  const newTitle = yield call(fetchTitle);
  yield put(receiveTitle(newTitle));
}

function* newTitleHandler(title) {
  const newTitle = yield call(changeTitle, { data: { title } });
  yield put(receiveTitle(newTitle));
}

function* newTitleWatcher() {
  while (true) {
    const { title } = yield take(EDIT_TITLE);
    yield fork(newTitleHandler, title);
  }
}

function* fetchTitleWatcher() {
  while (true) {
    yield take(FETCH_TITLE);
    yield fork(fetchTitleHandler);
  }
}

function* init() {
  yield take(INIT);
  yield call(fetchTitleHandler);
}

function* rootSaga() {
  yield all([newTitleWatcher(), fetchTitleWatcher(), init()]);
}

export { rootSaga };
