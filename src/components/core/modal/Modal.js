import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { UiCloseButton } from '~/shared/ui/close-button';
import ModalTitleForm from '~/components/core/modal/title-form/ModalTitleForm';
import ModalArticleForm from './article-form/ModalArticleForm';
import * as styles from './Modal.scss';

const ccn = classNames.bind(styles);

const Modal = ({
  isOpen,
  type,
  data,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
}) => {
  return (
    <div
      className={ccn('modal', {
        modal_active: isOpen,
      })}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__close}>
          <UiCloseButton onClick={onModalCloseClick} />
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
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any),
  onModalCloseClick: PropTypes.func.isRequired,
  onSubmitFormClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default Modal;
