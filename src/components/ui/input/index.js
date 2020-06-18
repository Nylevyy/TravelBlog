import React from "react";
import "./index.scss"

function Input(props) {
  const name = props.name;
  return (
    <div className={"input input_" + name}>
      <input
        className={"input__field input__field_" + name}
        type="text"
        id={"input_" + name}
        onInput={(e) => props.onInput(props.index, e.target.value)}
        onChange={(e) => props.onChange(props.index, e.target.value)}
        value={props.value}
      />
      <label
        htmlFor={"input_" + name}
        className="input__label">
        {props.label}
      </label>
    </div>
  );
}

export default Input