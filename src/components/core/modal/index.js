import React from "react";
import Form from "./form";
import "./index.scss"
import CloseButton from "../../ui/close-button";

const Modal = (props) => {
  return (
    <div className={"modal" + (props.modalData.isOpen ? " modal_active" : "")}>
      <div className="modal__container">
        <div className="modal__close">
          <CloseButton onClick={props.modalData.onModalCloseClick}/>
        </div>
        <div className="modal__form">
          {
            (props.modalData.request.hasError) && (
              <div className="modal__error-log">
                <span className="modal__error-span">
                  Не удалось выполнить запрос, повторите попытку
                </span>
              </div>
            )
          }
          <Form
            onSubmitFormClick={props.modalData.onSubmitFormClick}
            onDeleteClick={props.modalData.onDeleteCLick}
            closeModal={props.modalData.onModalCloseClick}
            articleData={props.modalData.currentArticleData}
          />
          {
            (props.modalData.request.isRequesting) && (
              <div className="modal__loading-indicator">
                {/*fetching-indicator*/}
                <div id="fountainG">
                  <div id="fountainG_1" className="fountainG"/>
                  <div id="fountainG_2" className="fountainG"/>
                  <div id="fountainG_3" className="fountainG"/>
                  <div id="fountainG_4" className="fountainG"/>
                  <div id="fountainG_5" className="fountainG"/>
                  <div id="fountainG_6" className="fountainG"/>
                  <div id="fountainG_7" className="fountainG"/>
                  <div id="fountainG_8" className="fountainG"/>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>

  )
};

export default Modal

