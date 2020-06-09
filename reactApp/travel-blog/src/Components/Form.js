import React from "react";
import InputWrapper from "./InputWrapper";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import Buttons from "./Buttons";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [
        {
          name: "title",
          value: "",
          label: "Событие"
        },
        {
          name: "location",
          value: "",
          label: "Место"
        },
        {
          name: "time",
          value: "",
          label: "Время"
        },
        {
          name: "content",
          value: "",
          label: ""
        }, {
          name: "checkbox",
          value: "",
          label: "Пометить событие как важное"
        }
      ]
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.inputs;
    const id = Date.now();
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const date = this.getDate(day, month);
    for (let i = 0; i < input.length - 1; i++) {
      if (!input[i].value) {
        alert("Поле " + input[i].name + " не заполнено");
        return
      }
    }
    const article = {
      title: input[0].value,
      location: input[1].value,
      time: input[2].value,
      content: input[3].value,
      isImportant: input[4].value,
      id: id
    };
    const storage = localStorage.getItem(date);
    if (!storage) {
      localStorage.setItem(date, JSON.stringify([article]));
    } else {
      const data = JSON.parse(storage);
      data.push(article);
      localStorage.setItem(date, JSON.stringify(data))
    }
    this.clearInputs()
  }
  getDate(day, monthNum) {
    const months = [" января", " февраля", " марта", " апреля", " мая", " июня",
      " июля", " августа", " сентября", " октября", " ноября", " декабря"];
    const month = months[monthNum];
    return (day + month)
  }
  handleReset() {
    this.clearInputs();
    console.log('clear')
  }
  handleChange(key, e) {
    const target = e.target;
    const value = (target.id === "form__checkbox" ? target.checked : target.value);
    const newState = this.state.inputs.slice();
    newState[+key].value = value;
    this.setState({inputs: newState});
    console.log(newState[key]);
  }
  clearInputs() {
    const inputs = this.state.inputs.slice();
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    this.setState({inputs: inputs})
  }
  render() {
    const inputs = this.state.inputs;
    const wrapper = () => {
      let wrappers = [];
      for (let i = 1; i < 3; i++) {
        wrappers.push(
          <InputWrapper name={inputs[i].name}
                        label={inputs[i].label}
                        inputIndex={i}
                        value=""
                        onChange={this.handleChange.bind(this)}
                        key={inputs[i].name}
          />
        )
      }
      return wrappers.map(item => {return item})
    };

    return (
      <form action=""
            className="modal__form form"
            onSubmit={(e) => this.handleSubmit(e)}
            onReset={() => this.handleReset()}
      >
        <InputWrapper name={inputs[0].name}
                      label={inputs[0].label}
                      inputIndex={0}
                      value=""
                      onChange={this.handleChange.bind(this)}
        />
        <div className="form__wrapper">
          {wrapper()}
        </div>
        <div className="form__input form__input_content input">
          <TextArea name={inputs[3].name}
                    label={inputs[3].label}
                    inputIndex={3}
                    value=""
                    onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form__input form__wrapper">
          <Checkbox name={inputs[4].name}
                    label={inputs[4].label}
                    inputIndex={4}
                    value=""
                    onChange={this.handleChange.bind(this)}
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