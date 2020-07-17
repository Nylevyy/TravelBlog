import { put, call, take, all } from '@redux-saga/core/effects';
import { REQUEST_LOG_IN, REQUEST_LOG_OUT } from './types';
import {
  logIn,
  logOut,
  startRequest,
  endRequest,
  reportError,
} from './actions';
import { auth, unAuth } from './services';

function* authHandler(login, password) {
  try {
    yield put(startRequest());
    const { userName } = yield call(auth, { data: { login, password } });
    yield put(logIn({ userName }));
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

function* authWatcher() {
  while (true) {
    const { login, password } = yield take(REQUEST_LOG_IN);
    yield call(authHandler, login, password);
  }
}

function* unAuthWatcher() {
  while (true) {
    yield take(REQUEST_LOG_OUT);
    yield call(unAuthHandler);
  }
}

function* rootAppSaga() {
  yield all([authWatcher(), unAuthWatcher()]);
}

export default rootAppSaga;
