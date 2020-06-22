import React from "react";
import "./index.scss"
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

const Input = (props) => {
  const name = props.name;
  console.log(props.notValidated.includes(2))
  return (
    <div className={"input input_" + name}>
      {
        ((props.index === 2) &&
          (
            <DateTimePicker
              className={(props.notValidated.includes(2)) ? 'react-datetime-picker_invalid' : ''}
              value={props.value}
              onChange={props.onChange.bind(null, 2)}
            />
          )
        ) || (
          < input
            className={"input__field input__field_" + name + (props.notValidated.includes(props.index) ? " input_invalid" : "")}
            type="text"
            id={"input_" + name}
            onInput={(e) => props.onInput(props.index, e.target.value)}
            onChange={(e) => props.onChange(props.index, e.target.value)}
            value={props.value}
          />
        )
      }
      <label
        htmlFor={"input_" + name}
        className="input__label">
        {props.label}
      </label>
    </div>
  );
};

export default Input