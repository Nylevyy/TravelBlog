import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '~/store/ducks/app';
import { calendarActions } from '~/store/ducks/calendar';
import Layout from '~/components/layouts/Layout';
import Calendar from '~/components/base/calendar/Calendar';
import { headerActions } from '~/store/ducks/header';
import Loader from '~/components/core/loaders/Loader';

const { setTitle } = headerActions;
const { closeModal, openModal } = appActions;
const { updateArticle, postNewArticle, deleteArticle } = calendarActions;

const Main = ({ modal, requestError, isFetching }) => {
  const dispatch = useDispatch();
  const onModalCloseClick = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);
  const onSubmitFormClick = useCallback(
    (payload, { type, id }) => {
      if (type === 'articleEditor') {
        if (id) {
          dispatch(updateArticle({ ...payload, id }));
          return;
        }
        dispatch(postNewArticle({ ...payload }));
      }
      dispatch(setTitle({ ...payload }));
    },
    [dispatch]
  );
  const onDeleteClick = useCallback(
    (payload) => () => {
      dispatch(deleteArticle({ ...payload }));
    },
    [dispatch]
  );
  const onArticleClick = useCallback(
    (payload) => {
      dispatch(openModal({ ...payload }));
    },
    [dispatch]
  );
  const calendar = useSelector((state) => state.calendar);
  return (
    <Layout
      {...modal}
      onModalCloseClick={onModalCloseClick}
      onSubmitFormClick={onSubmitFormClick}
      onDeleteClick={onDeleteClick}
    >
      {requestError && <h1>ERROR</h1>}
      {isFetching && <Loader />}
      <Calendar
        {...calendar}
        onDeleteClick={onDeleteClick}
        onArticleClick={onArticleClick}
      />
    </Layout>
  );
};

export default Main;
