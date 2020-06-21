import React from "react";
import Input from "../../../../ui/input";
import "./index.scss"


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
            onChange={props.onChange}
            value={props.values[1]}
            notValidated={props.notValidated}
          />
          <Input
            name="time"
            label="Время"
            index={2}
            onInput={props.onInput}
            onChange={props.onChange}
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