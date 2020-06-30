import { call, put, take } from '@redux-saga/core/effects';
import * as types from './types';
import requestServer from './services';

function* connectRemote() {
  while (true) {
    const {
      payload: { body = null, id = null },
    } = yield take(types.SEND_REQUEST);
    try {
      const data = yield call(requestServer, body, id);
      yield put({ type: types.SET_MODAL_DEFAULT });
      yield put({ type: types.RECEIVE_DATA, payload: data });
    } catch (err) {
      yield put({ type: types.CATCH_ERROR, payload: err });
    }
  }
}

export default connectRemote;
