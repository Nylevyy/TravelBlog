import React from "react";
import Button from "./Button";

export default class Buttons extends React.Component {


  render() { //todo: _modal modify
    const wrapper = this.props.wrapper;
    return (
      <div className={wrapper + "__buttons buttons"}>
        {this.props.types.map((type, index) => {
          return (
            <Button
              onClick={this.props.onClick}
              value={type.value}
              modification={type.mod}
              type={type.type}
              key={type.id}
              id={type.id}
              lSKey={type.lSKey}
            />
          )
        })}
      </div>
    )
  }
}