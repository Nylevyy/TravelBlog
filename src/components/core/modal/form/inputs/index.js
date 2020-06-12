import React from "react";
import Input from "../../../../ui/inputs";
import "./index.scss"


function handleChange(key, e) {
  const target = e.target;
  const value = (target.id === "form__checkbox" ? target.checked : target.value);
  const newState = this.state.inputs.slice();
  newState[+key].value = value;
  this.setState({inputs: newState});
}


function Inputs(props) {
  return (
    <div className="inputs">
      <Input name="title"
             label="Событие"
             inputIndex={0}
             onChange={props.onChange}
      />
      <div className="inputs__wrapper">
        <Input name="location"
               label="Место"
               inputIndex={1}
               onChange={props.onChange}
        />
        <Input name="time"
               label="Время"
               inputIndex={2}
               onChange={props.onChange}
        />
      </div>
      <textarea className="inputs__textarea"
                name="content"
                cols="25"
                rows="10"
                placeholder="Описание"
                onChange={(e) => props.onChange(props.inputIndex, e)}
      />
    </div>

    // <div className={"form__input input form__input_" + name}>
    //   <Input name={name}
    //          onChange={this.props.onChange}
    //          inputIndex={this.props.inputIndex}
    //          value={this.props.value}
    //   />
    //   <Label name={name} value={label}/>
    // </div>
  )
}


export default Inputs