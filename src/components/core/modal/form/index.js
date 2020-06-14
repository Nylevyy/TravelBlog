import React, {useState, useContext} from "react";
import Inputs from "./inputs";
import Button from "../../../ui/buttons";
import "./index.scss"

function Form(props) {
  const [inputs, setInputs] = useState(['', '', '', '', false]);


  const validateTime = (value) => { //todo
    return value.match(/[0-2]\d[:][0-5]\d/)
  };
  const handleReset = () => {
    setInputs(['', '', '', '', false])
  };
  const handleSubmit = (e, inputs) => {
    e.preventDefault();

    for (let i = 0; i < inputs.length - 1; i++) {
      if (!inputs[i]) {
        alert("Не все поля заполнены");
        return
      }
    }
    if (!validateTime(inputs[2])) {
      alert('Невалидное время');
      return;
    }
    const id = Date.now();

    const article = {
      title: inputs[0],
      location: inputs[1],
      time: inputs[2],
      content: inputs[3],
      isImportant: inputs[4],
      id: id
    };

    const day = new Date().getDate();
    const month = new Date().getMonth();
    const date = (day, month) => {
      const months = [" января", " февраля", " марта", " апреля", " мая", " июня",
        " июля", " августа", " сентября", " октября", " ноября", " декабря"];
      const monthName = months[month];
      return (day + monthName)
    };
    const storage = localStorage.getItem(date(day, month));

    if (!storage) {
      localStorage.setItem(date(day, month), JSON.stringify([article]));
    } else {
      const data = JSON.parse(storage);
      data.push(article);
      localStorage.setItem(date(day, month), JSON.stringify(data))
    }
    handleReset();
    props.onSubmit("submitForm")
  };

  const handleInput = (id) => {
    return function (value) {
      const newState = inputs.slice();
      if (id === 2) {
        if (value.length === 2) {
          if (!value.includes(':')) value+= ':'
        } else if (value.length > 5) return
      }
      newState[id] = value;
      setInputs(newState);
    }
  };
  return (
    <form action=""
          className="form"
          onSubmit={(e) => handleSubmit(e, inputs)}
    >
      <Inputs values={{'0': inputs[0], '1': inputs[1], '2': inputs[2], '3': inputs[3]}}
              onChange={handleInput}

      />

      <div className="form__submit">
        <div className="form__submit_checkbox">
          <input type="checkbox"
                 className="checkbox"
                 onChange={(e) => handleInput(4)(e.target.checked)}
                 checked={!!inputs[4]}
          />
          <label htmlFor="form__checkbox"
                 className="checkbox__label">
            Пометить событие как важное
          </label>
        </div>
        <div className="modal__buttons">
          <Button value="Готово"
                  mod="_submit small"
                  type="submit"
                  key="submitForm"
                  id="submitForm"
                  onClick={props.onClick}
          />
          <Button value="Удалить"
                  mod="_reset small"
                  type="reset"
                  key="resetForm"
                  id="resetForm"
                  onClick={() => handleReset()}
          />
        </div>
      </div>
    </form>
  )
}

export default Form