import React from "react";
import Input from "../../../../ui/inputs";
import "./index.scss"





function Inputs(props) {
  return (
    <div className="inputs">
      <Input name="title"
             label="Событие"
             index={0}
             onChange={props.onChange(0)}
             value={props.values[0]}

      />
      <div className="inputs__wrapper">
        <Input name="location"
               label="Место"
               index={1}
               onChange={props.onChange(1)}
               value={props.values[1]}
        />
        <Input name="time"
               label="Время"
               index={2}
               onChange={props.onChange(2)}
               value={props.values[2]}
        />
      </div>
      <textarea className="inputs__textarea"
                name="content"
                cols="25"
                rows="10"
                placeholder="Описание"
                onChange={(e) => props.onChange(3)(e.target.value)}
                value={props.values[3]}
      />
    </div>
  )
}


export default Inputs