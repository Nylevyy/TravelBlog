import React from "react";

export default function Label(props) {
  return (
    <label htmlFor={"input__" + props.name} className="input__label">{props.value}</label>
  );
}