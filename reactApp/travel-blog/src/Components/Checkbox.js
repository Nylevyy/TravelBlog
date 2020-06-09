import React from "react";

export default function Checkbox(props) {
  return (

    <div className="form__wrapper">
      <input type="checkbox"
             className="form__checkbox"
             id="form__checkbox"
             onChange={(e) => props.onChange(props.inputIndex, e)}
      />
      <label htmlFor="form__checkbox"
             className="form__checkbox_label">
        Пометить событие как важное
      </label>
    </div>
  )
}