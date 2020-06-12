import React, {useState} from "react";
import "./index.scss"

function Input(props) {
  const [input, setInput] = useState("");
  const name = props.name;
  const handleChange = value => {
    setInput(value);
  };
  return (
    <div className={"input input_" + name}>

      <input className={"input__field input_" + name}
             type="text"
             id={"input_" + name}
             onChange={(e) => handleChange(e.target.value)}
             value={input}
      />
      <label htmlFor={"input_" + name}
             className="input__label">
        {props.label}
      </label>
    </div>

);
}

export default Input