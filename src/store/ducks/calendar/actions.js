import {
  REQUEST_DATA,
  START_REQUEST,
  END_REQUEST,
  RECEIVE_DATA,
  SET_TITLE,
  RECEIVE_TITLE,
  RECEIVE_ARTICLES,
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CATCH_ERROR,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  SET_DEFAULT,
} from './types';

export const startRequest = () => ({
  type: START_REQUEST,
});

export const endRequest = () => ({
  type: END_REQUEST,
});

export const receiveData = (title, articles) => ({
  type: RECEIVE_DATA,
  title,
  articles,
});

export const receiveArticles = (articles) => ({
  type: RECEIVE_ARTICLES,
  articles,
});

export const receiveTitle = (title) => ({
  type: RECEIVE_TITLE,
  title,
});

export const catchError = (err) => ({
  type: CATCH_ERROR,
  err,
});

export const reportError = (err) => ({
  type: CRASH_WITH_ERROR,
  err,
});

export const openModal = (data = null) => ({
  type: OPEN_MODAL,
  data,
});

export const setTitle = (title) => ({
  type: SET_TITLE,
  title,
});

export const setDefault = () => ({
  type: SET_DEFAULT,
});

export const refresh = () => ({
  type: REQUEST_DATA,
});

export const postNewArticle = (article) => ({
  type: SEND_NEW_ARTICLE,
  article,
});

export const updateArticle = (article, id) => ({
  type: UPDATE_ARTICLE,
  article,
  id,
});

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  id,
});
