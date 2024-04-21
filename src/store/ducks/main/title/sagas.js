import { put, call, take, fork, all } from '@redux-saga/core/effects';
import { appActions } from '~/store/ducks/app';
import { EDIT_TITLE, FETCH_TITLE } from './types';
import { receiveTitle } from './actions';
import { changeTitle, fetchTitle } from './services';

const { startRequest, endRequest, reportError } = appActions;

function* fetchTitleHandler() {
  try {
    yield put(startRequest());
    const newTitle = yield call(fetchTitle);
    yield put(receiveTitle(newTitle));
    yield put(endRequest());
  } catch (e) {
    yield put(reportError());
  }
}

function* newTitleHandler(title) {
  try {
    yield put(startRequest());
    const newTitle = yield call(changeTitle, { data: { title } });
    yield put(receiveTitle(newTitle));
    yield put(endRequest());
  } catch (e) {
    yield put(reportError());
  }
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

function* rootTitleSaga() {
  yield all([newTitleWatcher(), fetchTitleWatcher()]);
}

export { rootTitleSaga };
