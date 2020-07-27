import {
  START_REQUEST,
  END_REQUEST,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
  LOG_IN,
  LOG_OUT,
  JOIN,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_DEFAULT,
  INIT,
} from './types';

export const startRequest = () => ({
  type: START_REQUEST,
});

export const endRequest = () => ({
  type: END_REQUEST,
});

export const requestLogIn = (payload) => ({
  type: REQUEST_LOG_IN,
  ...payload,
});

export const requestLogOut = () => ({
  type: REQUEST_LOG_OUT,
});

export const logIn = (payload) => ({
  type: LOG_IN,
  ...payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const join = (payload) => ({
  type: JOIN,
  ...payload,
});

export const reportError = (err) => ({
  type: CRASH_WITH_ERROR,
  err,
});

export const openModal = (payload) => ({
  type: OPEN_MODAL,
  ...payload,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const setDefault = () => ({
  type: SET_DEFAULT,
});

export const initApp = () => ({
  type: INIT,
});
