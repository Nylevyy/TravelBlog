import { put, call, take, all } from 'redux-saga/effects';
import { ApiError, StatusErrors, getErrorStatusCode } from '~/shared/api';
import { auth, logIn, logOut, registerNewUser } from '../api';
import { authorize, login, logout, register } from './actions';
import { setAuthStatus, setError } from './slice';
import { User } from './types';

function* errorHandler(e: unknown) {
  yield put(setAuthStatus({ isAuthorized: false }));

  if (
    e instanceof ApiError &&
    getErrorStatusCode(e) === StatusErrors.Unauthorized
  ) {
    yield put(setError({ message: 'Неверно введен логин или пароль' }));
    return;
  }

  if (e instanceof Error) {
    yield put(setError({ message: e.message }));
    return;
  }

  yield put(setError({ message: 'Что-то пошло не так' }));
}

function* authHandler() {
  try {
    yield call(auth);
    yield put(setAuthStatus({ isAuthorized: true }));
    yield put(setError(null));
  } catch (e: unknown) {
    yield put(setAuthStatus({ isAuthorized: false }));
    yield call(errorHandler, e);
  }
}

function* logInHandler(user: User) {
  try {
    yield call(logIn, user);
    yield put(setAuthStatus({ isAuthorized: true }));
    yield put(setError(null));
  } catch (e: unknown) {
    yield call(errorHandler, e);
  }
}

function* logOutHandler() {
  try {
    yield call(logOut);
    yield put(setAuthStatus({ isAuthorized: false }));
    yield put(setError(null));
  } catch (e: unknown) {
    yield call(errorHandler, e);
  }
}

function* registerHandler(user: User) {
  try {
    yield call(registerNewUser, user);
    yield put(setAuthStatus({ isAuthorized: true }));
    yield put(setError(null));
  } catch (e: unknown) {
    yield call(errorHandler, e);
  }
}

function* authWatcher() {
  while (true) {
    yield take(authorize.type);
    yield call(authHandler);
  }
}

function* logInWatcher() {
  while (true) {
    const { payload }: ReturnType<typeof login> = yield take(login.type);
    yield call(logInHandler, payload.user);
  }
}

function* logOutWatcher() {
  while (true) {
    yield take(logout.type);
    yield call(logOutHandler);
  }
}

function* registerWatcher() {
  while (true) {
    const { payload }: ReturnType<typeof register> = yield take(register.type);
    yield call(registerHandler, payload.user);
  }
}

function* rootAuthSaga() {
  yield all([
    authWatcher(),
    logInWatcher(),
    logOutWatcher(),
    registerWatcher(),
  ]);
}

export default rootAuthSaga;
