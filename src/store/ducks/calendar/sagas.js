import { call, put, take } from '@redux-saga/core/effects';
import * as types from './types';
import request from './services';

function* connectRemote() {
  while (true) {
    const {
      payload: { method, body },
    } = yield take(types.SEND_REQUEST);
    try {
      const data = yield call(request, method, JSON.stringify(body));
      const articles = yield call(() => JSON.parse(data));
      yield put({ type: types.SET_MODAL_DEFAULT });
      yield put({ type: types.RECEIVE_DATA, payload: articles });
    } catch (err) {
      yield put({ type: types.CATCH_ERROR, payload: err });
    }
  }
}

export default connectRemote;
