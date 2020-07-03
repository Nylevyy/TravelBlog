import {
  RECEIVE_ARTICLES,
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  REFRESH_ARTICLES,
  RECEIVE_DATA,
} from './types';

export const receiveData = (payload) => ({
  type: RECEIVE_DATA,
  ...payload,
});

export const receiveArticles = (payload) => ({
  type: RECEIVE_ARTICLES,
  ...payload,
});

export const postNewArticle = (payload) => ({
  type: SEND_NEW_ARTICLE,
  ...payload,
});

export const updateArticle = (payload) => ({
  type: UPDATE_ARTICLE,
  ...payload,
});

export const deleteArticle = (payload) => ({
  type: DELETE_ARTICLE,
  ...payload,
});

export const refresh = () => ({
  type: REFRESH_ARTICLES,
});
