import { RECEIVE_TITLE, EDIT_TITLE, FETCH_TITLE } from './types';

export const receiveTitle = (payload) => ({
  type: RECEIVE_TITLE,
  ...payload,
});

export const editTitle = (payload) => ({
  type: EDIT_TITLE,
  ...payload,
});

export const fetchTitle = () => ({
  type: FETCH_TITLE,
});
