import React from "react";
import Form from "./form";
import "./index.scss"
import CloseButton from "../../ui/close-button";

function Modal(props) {
  return (
    <div className={"modal" + (props.modalData.isOpen ? " modal_active" : "")}>
      <div className="modal__container">
        <div className="modal__close">
          <CloseButton onClick={props.modalData.onModalCloseClick}/>
        </div>
        <div className="modal__form">
          <Form
            onSubmitFormClick={props.modalData.onSubmitFormClick}
            onDeleteClick={props.modalData.onDeleteCLick}
            closeModal={props.modalData.onModalCloseClick}
            articleData={props.modalData.currentArticleData}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal