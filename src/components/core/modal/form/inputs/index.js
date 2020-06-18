import React from "react";
import Input from "../../../../ui/input";
import "./index.scss"


function Inputs(props) {
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

        />
        <div className="inputs__wrapper">
          <Input
            name="location"
            label="Место"
            index={1}
            onInput={props.onInput}
            onChange={props.onChange}
            value={props.values[1]}
          />
          <Input
            name="time"
            label="Время"
            index={2}
            onInput={props.onInput}
            onChange={props.onChange}
            value={props.values[2]}
          />
        </div>
      </div>
      <textarea
        className="inputs__textarea"
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
}


export default Inputs