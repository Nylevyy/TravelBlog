import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ModalForm from './form/ModalForm';
import styles from './Modal.scss';
import CloseButton from '~/components/ui/closeButton/CloseButton';

const modalClasses = classNames.bind(styles);

const Modal = ({
  isOpen,
  hasError,
  isRequesting,
  currentArticleData,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
}) => {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onModalCloseClick: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
    isRequesting: PropTypes.bool.isRequired,
    currentArticleData: PropTypes.arrayOf(PropTypes.any),
    onSubmitFormClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };
  return (
    <div className={modalClasses('modal', { modal_active: isOpen })}>
      <div className={styles.modal__container}>
        <div className={styles.modal__close}>
          <CloseButton onClick={onModalCloseClick} />
        </div>
        <div className={styles.modal__form}>
          {isRequesting && <div className={styles.modal__errorlog} />}
          {hasError && (
            <div className={styles.modal__errorLog}>
              <span className={styles.modal__errorSpan}>
                Не удалось выполнить запрос, повторите попытку
              </span>
            </div>
          )}
          <ModalForm
            onSubmitFormClick={onSubmitFormClick}
            onDeleteClick={onDeleteClick}
            articleData={currentArticleData}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
