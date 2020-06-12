import React from "react";
import "./index.scss"

function Button(props) {
  return (
    <button className={"button button" + props.mod}
            type={props.type}
            // onClick={() => this.props.onClick(id, key)}
    >
        {props.value}
    </button>
  )
}


export default Button