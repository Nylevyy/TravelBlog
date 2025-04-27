import { put, call, take, all } from '@redux-saga/core/effects';
import { REQUEST_LOG_IN, REQUEST_LOG_OUT, JOIN } from './types';
import { logOut, startRequest, endRequest, reportError } from './actions';
import { authLogin, authLogout, authJoin } from './services';

function* authLoginHandler(username, password) {
  try {
    yield put(startRequest());
    yield call(authLogin, { data: { username, password } });
    yield put(endRequest());
  } catch (e) {
    if (e.response?.data === 'Incorrect password.') {
      yield put(reportError(e));
      return;
    }
    if (e.response?.data === 'Incorrect password.') {
      yield put(reportError(e));
      return;
    }
    yield put(reportError());
  }
}

function* AuthLogoutHandler() {
  try {
    yield put(startRequest());
    yield call(authLogout);
    yield put(logOut());
    yield put(endRequest());
  } catch {
    yield put(reportError());
  }
}

function* joinHandler(userInfo) {
  try {
    yield put(startRequest());
    yield call(authJoin, { data: userInfo });
    yield put(endRequest());
  } catch {
    yield put(reportError());
  }
}

function* authLoginWatcher() {
  while (true) {
    const { username, password } = yield take(REQUEST_LOG_IN);
    yield call(authLoginHandler, username, password);
  }
}

function* AuthLogoutWatcher() {
  while (true) {
    yield take(REQUEST_LOG_OUT);
    yield call(AuthLogoutHandler);
  }
}

function* joinWatcher() {
  while (true) {
    const { userInfo } = yield take(JOIN);
    yield call(joinHandler, userInfo);
  }
}

function* rootAppSaga() {
  yield all([authLoginWatcher(), AuthLogoutWatcher(), joinWatcher()]);
}

export default rootAppSaga;
