import React from "react";
import InputWrapper from "./InputWrapper";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import Buttons from "./Buttons";

export default class Form extends React.Component {
  render() {
    const inputs = this.props.inputs;
    const wrapper = () => {
      let wrappers = [];
      for (let i = 1; i < 3; i++) {
        wrappers.push(
          <InputWrapper name={inputs[i].name}
                        label={inputs[i].label}
                        inputIndex={i}
                        value={inputs[i].value}
                        onChange={this.props.onChange}
                        key={inputs[i].name}
                        onClick={this.props.onClick}
                        popUp={this.props.popUp}
          />
        )
      }
      return wrappers.map(item => {return item})
    };
    return (

      <form action=""
            className="modal__form form"
            onSubmit={(e) => this.props.onSubmit(e, this.props.inputs)}
            onReset={() => this.props.onReset()}
      >
        <InputWrapper name={inputs[0].name}
                      label={inputs[0].label}
                      inputIndex={0}
                      value={inputs[0].value}
                      onChange={this.props.onChange}
        />
        <div className="form__wrapper">
          {wrapper()}
        </div>
        <div className="form__input form__input_content input">
          <TextArea name={inputs[3].name}
                    label={inputs[3].label}
                    inputIndex={3}
                    value={inputs[3].value}
                    onChange={this.props.onChange}
          />

        </div>
        <div className="form__input form__wrapper">
          <Checkbox name={inputs[4].name}
                    label={inputs[4].label}
                    inputIndex={4}
                    value={inputs[4].value}
                    onChange={this.props.onChange}
          />
          <Buttons
            wrapper="form"
            types={[
              { mod: "submit button_modal", value: "Готово", type: "submit", id: "submitButton" },
              { mod: "refresh button_modal", value: "Удалить", type: "reset", id: "resetButton" }
            ]}
            onClick={this.props.onClick}
          />
        </div>
      </form>
    )
  }
}