import { RECEIVE_TITLE, SET_TITLE } from './types';

export const receiveTitle = (payload) => ({
  type: RECEIVE_TITLE,
  ...payload,
});

export const setTitle = (payload) => ({
  type: SET_TITLE,
  ...payload,
});
