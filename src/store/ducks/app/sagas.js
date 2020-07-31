import { put, call, take, all } from '@redux-saga/core/effects';
import { REQUEST_LOG_IN, REQUEST_LOG_OUT, INIT, JOIN } from './types';
import {
  logIn,
  logOut,
  startRequest,
  endRequest,
  reportError,
  setDefault,
} from './actions';
import { auth, authLogin, authLogout, authJoin } from './services';

function* authHandler() {
  try {
    yield put(startRequest());
    const { username } = yield call(auth);
    yield put(logIn({ username }));
    yield put(setDefault());
    yield put(endRequest());
  } catch (e) {
    yield put(logIn({ username: null }));
    yield put(endRequest());
  }
}

function* authLoginHandler(username, password) {
  try {
    yield put(startRequest());
    yield call(authLogin, { data: { username, password } });
    yield call(authHandler);
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

function* authWatcher() {
  while (true) {
    yield take(INIT);
    yield call(authHandler);
  }
}

function* joinWatcher() {
  while (true) {
    const { userInfo } = yield take(JOIN);
    yield call(joinHandler, userInfo);
  }
}

function* rootAppSaga() {
  yield all([
    authLoginWatcher(),
    AuthLogoutWatcher(),
    authWatcher(),
    joinWatcher(),
  ]);
}

export default rootAppSaga;
