import React from "react";
import Button from "../Button";
import Form from "../Form";

export default class Modal extends React.Component {


  render() {
    const isOpen = this.props.isOpen;
    return (
      <div className="wrapper">
        <div className={isOpen ? "wrapper__modal wrapper_active" : "wrapper__modal"}>
          <div className="modal">
            <div className="modal__container container">
              <div className="modal__button">
                <Button modification="delete"
                        type="button"
                        value=""
                        id="closeModal"
                        onClick={this.props.onClick}
                />
              </div>
              <div className="modal__content">
                <Form onClick={this.props.onClick}
                      onSubmit={this.props.onSubmit}
                      onChange={this.props.onChange}
                      onReset={this.props.onReset}
                      inputs={this.props.inputs}
                      popUp={this.props.popUp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}