import {
  START_REQUEST,
  END_REQUEST,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_DEFAULT,
} from './types';

export const startRequest = () => ({
  type: START_REQUEST,
});

export const endRequest = () => ({
  type: END_REQUEST,
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
