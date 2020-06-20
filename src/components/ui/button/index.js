import React from "react";
import "./index.scss"

const Button = (props) => {
  const onClick = (button) => {
    button.blur();
    props.onClick()
  };
  return (
    <div className="button__wrapper">
      <button
        className={"button button" + props.mod}
        type="button"
        onClick={(e) => onClick(e.target.closest('button'))}
      >
        <span className="button__name">{props.value}</span>
      </button>
    </div>
  )
};


export default Button