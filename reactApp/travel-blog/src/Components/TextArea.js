import React from "react";

export default function TextArea(props) {
  return (
    <textarea className="input__content content"
              name="content"
              cols="30"
              rows="10"
              placeholder="Описание"
              onChange={(e) => props.onChange(props.inputIndex, e)}
    />
  )
}