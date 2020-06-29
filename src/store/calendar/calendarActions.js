import { take, put, call, all } from '@redux-saga/core/effects';
import { appStoreAPI } from '~/store/data/Data';

export const sendRequest = () => ({ type: 'REQUEST_DATA' });

export const sendArticle = (payload) => ({ type: 'SEND_DATA', payload });

// export const receiveData = (data) =>
// ({ type: 'RECEIVE_DATA', payload: data });
const request = async (method = 'GET', body = null) =>
  appStoreAPI[method](body).catch((err) => {
    throw err;
  });
/* const headers = {
    'Content-Type': 'application/json',
  };
  let url;
  switch (method) {
    case 'GET':
    case 'POST':
      url = dataURL;
      break;
    case 'DELETE':
      url = `dataURL/${body.id}`;
      break;
    case 'PUT':
      url = `dataURL/${body.id}`;
      break;
    default:
      throw new Error('unknown http method');
  }
   */
/* return fetch(url, { method, body, headers })
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((err) => {
        const error = new Error('Something went wrong...');
        error.data = err;
        throw error;
      });
    }); */

/*
export const requestData = () => (dispatch) => {
  dispatch(sendRequest());
  return fetch()
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => {
            dispatch(receiveData(json));
          });
        return;
      }
      response.json().then((err) => {
        const error = new Error('Something went wrong...');
        error.data = err;
        throw error;
      });
    });
}; */

// const dataURL = 'https://my-json-server.typicode.com/Nylevyy/TravelBlogFakeDB/articles';

function* receiveData() {
  while (true) {
    yield take('REQUEST_DATA');
    try {
      const data = yield call(request);
      const articles = yield call(() => JSON.parse(data));
      yield put({ type: 'RECEIVE_DATA', payload: articles });
    } catch (err) {
      yield put({ type: 'CATCH_ERROR', payload: err });
    }
  }
}
function* sendData() {
  while (true) {
    const {
      payload: { method, body },
    } = yield take('SEND_DATA');
    try {
      const data = yield call(request, method, JSON.stringify(body));
      const articles = yield call(() => JSON.parse(data));
      yield put({ type: 'SET_MODAL_DEFAULT' });
      yield put({ type: 'RECEIVE_DATA', payload: articles });
    } catch (err) {
      yield put({ type: 'CATCH_ERROR', payload: err });
    }
  }
}

export function* rootSaga() {
  yield all([receiveData(), sendData()]);
}
