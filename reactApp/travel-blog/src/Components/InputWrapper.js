import React from "react";
import Input from "./Input";
import LocationLabel from "./LocationLabel";
import Label from "./Label";

export default class InputWrapper extends React.Component {

  render() {
    const name = this.props.name;
    const label = this.props.label;
    const isLoc = (name === "location");

    if (isLoc) return (
      <div className={"form__input input form__input_" + name}>
        <Input name={name}
               onChange={this.props.onChange}
               inputIndex={this.props.inputIndex}
        />
        <LocationLabel/>
      </div>
    );
    return (

      <div className={"form__input input form__input_" + name}>
        <Input name={name}
               onChange={this.props.onChange}
               inputIndex={this.props.inputIndex}
        />
        <Label name={name} value={label}/>
      </div>
    )
  }
}