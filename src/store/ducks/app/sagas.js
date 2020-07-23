import { put, call, take, all } from '@redux-saga/core/effects';
import { REQUEST_LOG_IN, REQUEST_LOG_OUT, INIT } from './types';
import {
  logIn,
  logOut,
  startRequest,
  endRequest,
  reportError,
} from './actions';
import { auth, authLogin, unAuth } from './services';

function* authHandler() {
  try {
    yield put(startRequest());
    const { username } = yield call(auth);
    yield put(logIn({ username }));
    yield put(endRequest());
  } catch (e) {
    if (e.response.status === 401) {
      yield put(logIn({ username: null }));
      yield put(endRequest());
      return;
    }
    yield put(reportError(e));
  }
}

function* authLoginHandler(username, password) {
  try {
    yield put(startRequest());
    yield call(authLogin, { data: { username, password } });
    yield call(authHandler);
    yield put(endRequest());
  } catch (e) {
    yield put(reportError(e));
  }
}

function* unAuthHandler() {
  try {
    yield put(startRequest());
    yield call(unAuth);
    yield put(logOut());
    yield put(endRequest());
  } catch (e) {
    yield put(reportError(e));
  }
}

function* authLoginWatcher() {
  while (true) {
    const { username, password } = yield take(REQUEST_LOG_IN);
    yield call(authLoginHandler, username, password);
  }
}

function* unAuthWatcher() {
  while (true) {
    yield take(REQUEST_LOG_OUT);
    yield call(unAuthHandler);
  }
}

function* authWatcher() {
  while (true) {
    yield take(INIT);
    yield call(authHandler);
  }
}

function* rootAppSaga() {
  yield all([authLoginWatcher(), unAuthWatcher(), authWatcher()]);
}

export default rootAppSaga;
