import {
  CREATE_ARTICLE_ACTION,
  UPDATE_ARTICLE_ACTION,
  DELETE_ARTICLE_ACTION,
} from './constants';

export const createArticle = (payload) => ({
  type: CREATE_ARTICLE_ACTION,
  ...payload,
});

export const updateArticle = (payload) => ({
  type: UPDATE_ARTICLE_ACTION,
  ...payload,
});

export const deleteArticle = (payload) => ({
  type: DELETE_ARTICLE_ACTION,
  ...payload,
});
