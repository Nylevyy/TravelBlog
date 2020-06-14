import React from "react";
import "./index.scss"

function Button(props) {
  return (
    <button className={"button button" + props.mod}
            type={props.type}
            onClick={() => props.onClick(props.id)}
            id={props.id}
    >
        {props.value}
    </button>
  )
}


export default Button