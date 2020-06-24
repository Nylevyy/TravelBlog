import React from 'react';
import PropTypes from 'prop-types';
import ModalForm from './form/ModalForm';
import './Modal.scss';
import CloseButton from '~/components/ui/closeButton/CloseButton';

const Modal = (
  {
    modalData: {
      isOpen,
      onModalCloseClick,
      request: {
        hasError,
        // isRequesting,
      },
      currentArticleData,
      onSubmitFormClick,
      onDeleteCLick,
    },
  },
) => {
  Modal.propTypes = {
    modalData: PropTypes.exact(
      {
        isOpen: PropTypes.bool.isRequired,
        onModalCloseClick: PropTypes.func.isRequired,
        request: PropTypes.exact(
          {
            hasError: PropTypes.arrayOf(PropTypes.number),
            isRequesting: PropTypes.bool.isRequired,
          },
        ),
        currentArticleData: PropTypes.arrayOf(PropTypes.any),
        onSubmitFormClick: PropTypes.func,
        onDeleteCLick: PropTypes.func,
      },
    ),
  };
  return (
    <div className={`modal ${isOpen ? 'modal_active' : ''}`}>
      <div className="modal__container">
        <div className="modal__close">
          <CloseButton onClick={onModalCloseClick} />
        </div>
        <div className="modal__form">
          {
            (hasError) && (
              <div className="modal__error-log">
                <span className="modal__error-span">
                  Не удалось выполнить запрос, повторите попытку
                </span>
              </div>
            )
          }
          <ModalForm
            onSubmitFormClick={onSubmitFormClick}
            onDeleteClick={onDeleteCLick}
            articleData={currentArticleData}
          />
          {/* {
            (isRequesting) && (
              <div className="modal__loading-indicator">
                <div id="fountainG">
                  <div id="fountainG_1" className="fountainG" />
                  <div id="fountainG_2" className="fountainG" />
                  <div id="fountainG_3" className="fountainG" />
                  <div id="fountainG_4" className="fountainG" />
                  <div id="fountainG_5" className="fountainG" />
                  <div id="fountainG_6" className="fountainG" />
                  <div id="fountainG_7" className="fountainG" />
                  <div id="fountainG_8" className="fountainG" />
                </div>
              </div>
            )
          } */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
