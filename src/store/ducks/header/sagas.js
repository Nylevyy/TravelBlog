import { put, call, take, fork } from '@redux-saga/core/effects';
import { SET_TITLE } from './types';
import { receiveTitle } from './actions';
import { changeTitle, getTitle } from './services';
import { appActions } from '../app';

const { startRequest, endRequest, reportError } = appActions;

function* newTitleHandler(title) {
  try {
    yield put(startRequest());
    yield call(changeTitle, { data: title });
    const newTitle = yield call(getTitle);
    yield put(receiveTitle({ newTitle }));
    yield put(endRequest());
  } catch (err) {
    yield put(reportError(err));
  }
}

function* newTitleWatcher() {
  while (true) {
    const { title } = yield take(SET_TITLE);
    yield fork(newTitleHandler, title);
  }
}

function* rootSaga() {
  yield newTitleWatcher();
}

export default rootSaga;
