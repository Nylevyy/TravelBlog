import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../core/header/Header';
import Footer from '../../core/footer/Footer';
import Modal from '../../core/modal/Modal';
import { mainActions } from '~/store/ducks/main';
import { articlesActions } from '~/store/ducks/main/articles';
import { appActions } from '~/store/ducks/app';
import { titleActions, titleSelectors } from '~/store/ducks/main/title';

const { initMain } = mainActions;
const { updateArticle, postNewArticle, deleteArticle } = articlesActions;
const {
  openModal,
  setDefault,
  closeModal,
  requestLogOut,
  requestLogIn,
} = appActions;
const { editTitle } = titleActions;
const { titleSelector } = titleSelectors;

const LayoutMain = ({ modal, children, isLoggedIn }) => {
  const title = useSelector((state) => titleSelector(state));
  const dispatch = useDispatch();
  const onNewEventClick = useCallback(() => {
    dispatch(openModal({ modalType: 'articleEditor', data: null }));
  }, [dispatch]);
  const onLogOutClick = useCallback(() => {
    dispatch(requestLogOut());
  }, [dispatch]);
  const onRefreshContentClick = useCallback(() => {
    dispatch(setDefault());
    dispatch(initMain());
  }, [dispatch]);
  const onTitleClick = useCallback(
    (oldTitle) => {
      dispatch(
        openModal({ data: { title: oldTitle }, modalType: 'titleEditor' })
      );
    },
    [dispatch]
  );
  const onLogoClick = useCallback(() => {
    dispatch(openModal({ modalType: 'loginForm', data: null }));
  }, [dispatch]);
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
        return;
      }
      if (type === 'loginForm') {
        dispatch(requestLogIn({ ...payload }));
        return;
      }
      dispatch(editTitle({ ...payload }));
    },
    [dispatch]
  );
  const onDeleteClick = useCallback(
    (id) => {
      return () => {
        dispatch(deleteArticle({ id }));
      };
    },
    [dispatch]
  );
  return (
    <>
      <Header
        title={title}
        isLoggedIn={isLoggedIn}
        onNewEventClick={onNewEventClick}
        onRefreshContentClick={onRefreshContentClick}
        onTitleClick={onTitleClick}
        onLogoClick={onLogoClick}
      />
      {children}
      <Footer />
      <Modal
        {...modal}
        isLoggedIn={isLoggedIn}
        onModalCloseClick={onModalCloseClick}
        onSubmitFormClick={onSubmitFormClick}
        onLogOutClick={onLogOutClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

LayoutMain.propTypes = {
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default LayoutMain;
