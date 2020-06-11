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
               value={this.props.value}
        />
        <LocationLabel popUp={this.props.popUp}
                       onClick={this.props.onClick}
        />
      </div>
    );
    return (

      <div className={"form__input input form__input_" + name}>
        <Input name={name}
               onChange={this.props.onChange}
               inputIndex={this.props.inputIndex}
               value={this.props.value}
        />
        <Label name={name} value={label}/>
      </div>
    )
  }
}