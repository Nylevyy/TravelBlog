import {
  OPEN_MODAL,
  REQUEST_DATA,
  SET_TITLE,
  SEND_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  SET_DEFAULT,
} from './types';

const openModal = (data = null) => ({
  type: OPEN_MODAL,
  data,
});

const setTitle = (title) => ({
  type: SET_TITLE,
  title,
});

const setModalDefault = () => ({
  type: SET_DEFAULT,
});

const refresh = () => ({
  type: REQUEST_DATA,
});

const postNewArticle = (article) => ({
  type: SEND_NEW_ARTICLE,
  article,
});

const updateArticle = (article, id) => ({
  type: UPDATE_ARTICLE,
  article,
  id,
});

const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  id,
});

export default {
  openModal,
  setTitle,
  setModalDefault,
  refresh,
  postNewArticle,
  updateArticle,
  deleteArticle,
};
