import { put, call, all, takeLatest, select, spawn } from 'redux-saga/effects';
import { nanoid } from '@reduxjs/toolkit';
import { endRequest, startRequest } from '~/shared/ui/loader';
import { fetchConfig, updateBlogConfig } from '../api';
import { editBlogConfig, editBlogTitle, receiveConfig } from './actions';
import { setConfig, setError, setBlogConfig, getBlogConfig } from './slice';
import { UserBlogConfig } from './types';
import { mapUserAppConfigResponseToModel } from './mappers';

function* errorHandler(e: unknown) {
  if (e instanceof Error) {
    yield put(setError({ message: e.message }));
    return;
  }

  yield put(setError({ message: 'Что-то пошло не так' }));
}

function withLoader<T extends (...args: Parameters<T>) => Generator>(
  saga: T,
): () => Generator {
  const reqId = nanoid();

  return function* decorated(...args: Parameters<T>) {
    try {
      yield put(startRequest(reqId));
      return yield call(saga, ...args);
    } finally {
      yield put(endRequest(reqId));
    }
  };
}

function* fetchConfigWorker() {
  const applicationConfig = (yield call(fetchConfig)) as YieldResult<
    typeof fetchConfig
  >;
  yield put(setConfig(mapUserAppConfigResponseToModel(applicationConfig)));
}

function* editBlogConfigWorker(action: typeof editBlogConfig) {
  if (!editBlogConfig.match(action)) {
    throw new Error('Action does not match `editBlogConfig`');
  }

  const blog = (yield call(
    updateBlogConfig,
    action.payload.data,
  )) as YieldResult<typeof updateBlogConfig>;
  yield put(setBlogConfig(blog));
}

function* editTitleWorker(action: typeof editBlogTitle) {
  if (!editBlogTitle.match(action)) {
    throw new Error('Action does not match `editBlogTitle`');
  }

  const currentBlogConfig: UserBlogConfig | null = yield select(getBlogConfig);

  if (!currentBlogConfig) {
    throw new Error('User blog config state has not been initialized');
  }

  yield put(
    editBlogConfig({
      data: {
        ...currentBlogConfig,
        title: action.payload,
      },
    }),
  );
}

function* fetchConfigWatcher() {
  try {
    yield takeLatest(receiveConfig.type, withLoader(fetchConfigWorker));
    yield put(setError(null));
  } catch (e: unknown) {
    yield spawn(errorHandler, e);
  }
}

function* editBlogConfigWatcher() {
  try {
    yield takeLatest(editBlogConfig.type, withLoader(editBlogConfigWorker));
    yield put(setError(null));
  } catch (e: unknown) {
    yield spawn(errorHandler, e);
  }
}

function* editBlogConfigTitleWatcher() {
  try {
    yield takeLatest(editBlogTitle.type, withLoader(editTitleWorker));
    yield put(setError(null));
  } catch (e: unknown) {
    yield spawn(errorHandler, e);
  }
}

function* rootAuthSaga() {
  yield all([
    fetchConfigWatcher(),
    editBlogConfigWatcher(),
    editBlogConfigTitleWatcher(),
  ]);
}

export default rootAuthSaga;
