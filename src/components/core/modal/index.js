import React from "react";
import Form from "./form";
import "./index.scss"

function Modal(props) {
  const isOpen = props.isOpen || true;
  return (
    <div className={"modal" + (isOpen ? " modal_active" : "")}>
      <div className="modal__container">
        <div className="modal__close">
          <button className="modal__close_button">{/*close*/}</button>
        </div>
        <div className="modal__form">
          <Form/>
          {/*<Form onClick={props.onClick}*/}
          {/*      onSubmit={props.onSubmit}*/}
          {/*      onChange={props.onChange}*/}
          {/*      onReset={props.onReset}*/}
          {/*      inputs={props.inputs}*/}
          {/*      popUp={props.popUp}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  )
}
//todo
export default Modal