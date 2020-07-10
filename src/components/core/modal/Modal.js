import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ModalArticleForm from './article-form/ModalArticleForm';
import styles from './Modal.scss';
import CloseButton from '~/components/ui/close-button/CloseButton';
import ModalTitleForm from '~/components/core/modal/title-form/ModalTitleForm';

const ccn = classNames.bind(styles);

const Modal = ({
  isOpen,
  type,
  data,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
}) => (
  <div
    className={ccn('modal', {
      modal_active: isOpen,
    })}
  >
    <div className={styles.modal__container}>
      <div className={styles.modal__close}>
        <CloseButton onClick={onModalCloseClick} />
      </div>
      <div className={styles.modal__form}>
        {type === 'articleEditor' && (
          <ModalArticleForm
            onSubmitFormClick={onSubmitFormClick}
            onDeleteClick={onDeleteClick}
            data={data}
          />
        )}
        {type === 'titleEditor' && (
          <ModalTitleForm
            onSubmitFormClick={onSubmitFormClick}
            onDeleteClick={onDeleteClick}
            title={data.title}
          />
        )}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onModalCloseClick: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  onSubmitFormClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default Modal;
