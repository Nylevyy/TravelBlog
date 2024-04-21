import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { mainActions } from '~/store/ducks/main';
import { articlesActions } from '~/store/ducks/main/articles';
import { appActions } from '~/store/ducks/app';
import { titleActions, titleSelectors } from '~/store/ducks/main/title';
import Modal from '../../core/modal/Modal';
import Footer from '../../core/footer/Footer';
import Header from '../../core/header/Header';

const { initMain } = mainActions;
const { updateArticle, postNewArticle, deleteArticle } = articlesActions;
const { openModal, setDefault, closeModal, requestLogOut } = appActions;
const { editTitle } = titleActions;
const { titleSelector } = titleSelectors;

const LayoutMain = ({ modal, children }) => {
  const title = useSelector((state) => titleSelector(state));
  const dispatch = useDispatch();
  const onNewEventClick = useCallback(() => {
    dispatch(openModal({ modalType: 'articleEditor', data: null }));
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
    dispatch(requestLogOut());
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
        onNewEventClick={onNewEventClick}
        onRefreshContentClick={onRefreshContentClick}
        onTitleClick={onTitleClick}
        onLogoClick={onLogoClick}
      />
      {children}
      <Footer />
      <Modal
        {...modal}
        onModalCloseClick={onModalCloseClick}
        onSubmitFormClick={onSubmitFormClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

LayoutMain.propTypes = {
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element,
};

export default LayoutMain;
