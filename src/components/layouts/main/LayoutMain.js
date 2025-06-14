import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import {
  createArticle,
  deleteArticle,
  updateArticle,
} from '~/entities/article';
import { mainActions } from '~/store/ducks/main';
import { appActions } from '~/store/ducks/app';
import { titleActions, titleSelectors } from '~/store/ducks/main/title';
import Modal from '../../core/modal/Modal';
import Footer from '../../core/footer/Footer';
import Header from '../../core/header/Header';

const { initMain } = mainActions;
const { openModal, setDefault, closeModal, requestLogOut } = appActions;
const { editTitle } = titleActions;
const { titleSelector } = titleSelectors;

const LayoutMain = ({ modal, children }) => {
  const title = useAppSelector((state) => titleSelector(state));
  const dispatch = useAppDispatch();
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
        openModal({ data: { title: oldTitle }, modalType: 'titleEditor' }),
      );
    },
    [dispatch],
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
          dispatch(closeModal());
          return;
        }
        dispatch(createArticle({ ...payload }));
        dispatch(closeModal());
        return;
      }
      dispatch(editTitle({ ...payload }));
      dispatch(closeModal());
    },
    [dispatch],
  );
  const onDeleteClick = useCallback(
    (id) => {
      return () => {
        dispatch(deleteArticle({ id }));
        dispatch(closeModal());
      };
    },
    [dispatch],
  );
  return (
    <>
      <Header
        title={title}
        onLogoClick={onLogoClick}
        onNewEventClick={onNewEventClick}
        onRefreshContentClick={onRefreshContentClick}
        onTitleClick={onTitleClick}
      />
      {children}
      <Footer />
      <Modal
        {...modal}
        onDeleteClick={onDeleteClick}
        onModalCloseClick={onModalCloseClick}
        onSubmitFormClick={onSubmitFormClick}
      />
    </>
  );
};

LayoutMain.propTypes = {
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element,
};

export default LayoutMain;
