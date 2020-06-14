import React, {useState} from "react";
import Form from "./form";
import "./index.scss"

function Modal(props) {
  return (
    <div className={"modal" + (props.isOpen ? " modal_active" : "")}>
      <div className="modal__container">
        <div className="modal__close">
          <button className="modal__close_button"
                  onClick={() => props.onClick("modalClose")}
                  id="modalClose"
          >
            {/*close*/}
          </button>
        </div>
        <div className="modal__form">
          <Form onSubmit={props.onClick}
                onClick={props.onClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal