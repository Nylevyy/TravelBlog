import { put, call, take, fork, all } from '@redux-saga/core/effects';
import { SET_TITLE, GET_TITLE } from './types';
import { receiveTitle } from './actions';
import { changeTitle, getTitle } from './services';

function* getTitleHandler() {
  const newTitle = yield call(getTitle);
  yield put(receiveTitle(newTitle));
}

function* newTitleHandler(title) {
  yield call(changeTitle, { data: { title } });
  yield call(getTitleHandler);
}

function* newTitleWatcher() {
  while (true) {
    const { title } = yield take(SET_TITLE);
    yield fork(newTitleHandler, title);
  }
}

function* getTitleWatcher() {
  while (true) {
    yield take(GET_TITLE);
    yield fork(getTitleHandler);
  }
}

function* rootSaga() {
  yield all([newTitleWatcher(), getTitleWatcher()]);
}

export { rootSaga };
