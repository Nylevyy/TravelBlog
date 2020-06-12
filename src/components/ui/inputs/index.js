import React from "react";
import "./index.scss"

function Input(props) {
  const name = props.name;
  return (
    <div className={"input input_" + name}>
      <input className={"input__field input_" + name}
              type="text"
              id={"input_" + name}
              onChange={(e) => props.onChange(props.inputIndex, e)}
              value={props.value}
      />
      <label htmlFor={"input_" + name}
             className="input__label">
        {props.label}
      </label>
    </div>
  );
}

export default Input