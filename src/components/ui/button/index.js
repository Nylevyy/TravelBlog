import React from "react";
import "./index.scss"

const Button = (props) => {
  return (
    <div className="button__wrapper">
      <button
        className={"button button" + props.mod}
        type="button"
        onClick={() => props.onClick()}
      >
        <span className="button__name">{props.value}</span>
      </button>
    </div>
  )
};


export default Button