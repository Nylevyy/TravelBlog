import React from "react";
import Input from "../../../../ui/input/Input";
import "./FormInputs.scss"
import DatePicker from "../../../../widgets/datePicker/DatePicker";


const Inputs = (props) => {
  return (
    <div className="inputs">
      <div className="inputs_small">
        <Input
          name="title"
          label="Событие"
          index={0}
          onInput={props.onInput}
          onChange={props.onChange}
          value={props.values[0]}
          notValidated={props.notValidated}
        />
        <div className="inputs__wrapper">
          <Input
            name="location"
            label="Место"
            index={1}
            onInput={props.onInput}
            value={props.values[1]}
            notValidated={props.notValidated}
            onChange={props.onChange}
          />
          <DatePicker
            onChange={props.onChange.bind(null, 2)}
            value={props.values[2]}
            notValidated={props.notValidated}
          />
        </div>
      </div>
      <textarea
        className={"inputs__textarea" + (props.notValidated.includes(3) ? " inputs_invalid" : "")}
        name="content"
        cols="25"
        rows="8"
        placeholder="Описание"
        onInput={(e) => props.onInput(3, e.target.value)}
        onChange={(e) => props.onChange(3, e.target.value)}
        value={props.values[3]}
      />
    </div>
  )
};


export default Inputs