import { RECEIVE_CONFIG, EDIT_TITLE, FETCH_CONFIG } from './types';

export const receiveConfig = (payload) => ({
  type: RECEIVE_CONFIG,
  ...payload,
});

export const editTitle = (payload) => ({
  type: EDIT_TITLE,
  ...payload,
});

export const fetchConfig = () => ({
  type: FETCH_CONFIG,
});
