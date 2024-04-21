import { put, call, take, fork, all } from '@redux-saga/core/effects';
import { appActions } from '~/store/ducks/app';
import { INIT_MAIN } from './types';
import { titleActions } from './title';
import { articlesActions } from './articles';
import { fetchMainData } from './services';

const { startRequest, endRequest, reportError } = appActions;
const { receiveTitle } = titleActions;
const { receiveArticles } = articlesActions;

function* fetchMainDataHandler() {
  try {
    yield put(startRequest());
    const { title, articles } = yield call(fetchMainData);
    yield put(receiveTitle({ title }));
    yield put(receiveArticles({ articles }));
    yield put(endRequest());
  } catch (e) {
    yield put(reportError());
  }
}

function* fetchMainDataWatcher() {
  while (true) {
    yield take(INIT_MAIN);
    yield fork(fetchMainDataHandler);
  }
}

function* rootMainSaga() {
  yield all([fetchMainDataWatcher()]);
}

export default rootMainSaga;
