import React from "react";

export default class Button extends React.Component {

  render() {
    const mod = this.props.modification;
    const type = this.props.type;
    const value = this.props.value;
    const id = this.props.id;
    return (
      <button
        className={"buttons__button button button_" + mod}
        type={type}
        onClick={() => this.props.onClick(id)}
        id={id}
      >
        {value}
      </button>
    )
  }
}