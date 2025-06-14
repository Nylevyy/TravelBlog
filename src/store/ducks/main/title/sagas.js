import { put, call, take, fork, all, select } from '@redux-saga/core/effects';
import { appActions } from '~/store/ducks/app';
import { EDIT_TITLE, FETCH_CONFIG } from './types';
import { receiveConfig } from './actions';
import { changeTitle, fetchConfig } from './services';
import { blogConfigIdSelector } from './selectors';

const { startRequest, endRequest, reportError } = appActions;

function* fetchConfigHandler() {
  try {
    yield put(startRequest());
    const { blogConfig } = yield call(fetchConfig);
    yield put(receiveConfig({ blogConfig }));
    yield put(endRequest());
  } catch (e) {
    yield put(reportError());
  }
}

function* newTitleHandler(title) {
  try {
    yield put(startRequest());
    const blogConfigIdFromState = yield select(blogConfigIdSelector);
    const blogConfig = yield call(changeTitle, blogConfigIdFromState, {
      data: { title },
    });
    yield put(receiveConfig({ blogConfig }));
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

function* fetchConfigWatcher() {
  while (true) {
    yield take(FETCH_CONFIG);
    yield fork(fetchConfigHandler);
  }
}

function* rootTitleSaga() {
  yield all([newTitleWatcher(), fetchConfigWatcher()]);
}

export { rootTitleSaga };
