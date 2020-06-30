import * as types from './types';

const openModal = (data = null) => ({
  type: types.OPEN_MODAL,
  payload: data,
});

const setTitle = (title) => ({
  type: types.SET_TITLE,
  payload: title,
});

const setModalDefault = () => ({
  type: types.SET_MODAL_DEFAULT,
});

const sendRequest = (method = 'GET', body = null) => ({
  type: types.SEND_REQUEST,
  payload: {
    method,
    body,
  },
});

export default { openModal, setTitle, setModalDefault, sendRequest };
