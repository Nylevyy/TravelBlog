import React from "react";

export default function Input(props) {
  const name = props.name;
  const type = (name === "time") ? "time" : "text";
  return (
    <input type={type}
           className={name + " input__field input__" + name}
           id={"input__" + name}
           onChange={(e) => props.onChange(props.inputIndex, e)}
    />
  );
}