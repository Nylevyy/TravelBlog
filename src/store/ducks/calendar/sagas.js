import { call, put, take } from '@redux-saga/core/effects';
import * as types from './types';
import requestServer from './services';

function* connectRemote(body, id) {
  return yield call(requestServer, body, id);
}

function* crossConnectionManager() {
  while (true) {
    const {
      payload: { body = null, id = null },
    } = yield take(types.SEND_REQUEST);
    try {
      const data = yield call(connectRemote, body, id);
      yield put({ type: types.RECEIVE_DATA, payload: data });
      yield put({ type: types.SET_DEFAULT });
    } catch (err) {
      yield put({ type: types.CATCH_ERROR, payload: err });
    }
  }
}

export default crossConnectionManager;
