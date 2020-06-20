import React, {useEffect, useState} from "react";
import Inputs from "./inputs";
import Button from "../../../ui/button";
import "./index.scss";
import moment from "moment";

const Form = (props) => {
  const [inputs, setInputs] = useState(
    {
      articleData: null,
      isEditMode: false,
      values: ['', '', '', '', false],
      onInput(index, value) {
        let newValue = value;
        if (index === 2) {
          newValue = inputs.maskInputTime(value);
          if (newValue === false) return
        }
        setInputs(inputs => {
          const newInputs = inputs.values.slice();
          newInputs[index] = newValue;
          return (
            {
              ...inputs,
              values: newInputs
            }
          )
        })
      },
      onChange(index, value) {
        let newValue = value;
        if (index === 2) {
          newValue = inputs.maskInputTime(value);
          if (!newValue) return
        }
        setInputs(inputs => {
          const newInputs = inputs.values.slice();
          newInputs[index] = newValue;
          return (
            {
              ...inputs,
              values: newInputs
            }
          )
        })
      },
      maskInputTime(value) {
        if (value.match(/[^0-9:]+/g)) return false;
        if (value.length === 2) {
          if (!value.includes(':')) (value += ':')
        } else if (value.length > 5) return false;
        return value
      },
      validateTime(value) {
        if (!value.match(/[0-1]\d[:][0-5]\d/)) {
          return !!value.match(/[2][0-3][:][0-5]\d/);
        } else return true;
      },
      onSubmitForm() {
        for (let i = 0; i < this.values.length - 1; i++) {
          if (!this.values[i]) {
            alert("Не все поля заполнены");
            return
          }
          if (i === 2) {
            if (!inputs.validateTime(this.values[2])) {
              alert('Неверно указано время');
              return
            }
          }
        }
        const date = this.isEditMode ? moment(this.articleData[2]) : moment();
        const hours = +this.values[2].slice(0, 2);
        const minutes = +this.values[2].slice(3, 5);
        const article = {
          title: this.values[0],
          location: this.values[1],
          date: date.hour(hours).minute(minutes),
          description: this.values[3],
          isImportant: this.values[4],
          id: this.id
        };
        props.onSubmitFormClick(article);
        setInputs(inputs => ({
            ...inputs,
            values: ['', '', '', '', false]
          }
        ))
      },
    }
  );
  useEffect(() => {
    if (!props.articleData) {
      setInputs(inputs => (
          {
            ...inputs,
            articleData: null,
            isEditMode: false,
            values: ['', '', '', '', false],
            id: Date.now(),
          }
        ))
    } else {
      const values = props.articleData.slice(0, 5);
      values[2] = moment(values[2]).format('HH:mm');
      setInputs(inputs => (
        {
          ...inputs,
          articleData: props.articleData,
          isEditMode: true,
          values: values,
          id: props.articleData[5],
        }
      ))
    }
  }, [props.articleData]);


return (
  <form
    action=""
    className="form"
  >
    <Inputs
      values={[inputs.values[0], inputs.values[1], inputs.values[2], inputs.values[3]]}
      onChange={inputs.onChange}
      onInput={inputs.onInput}
    />

    <div className="form__dashboard">
      <div className="form__checkbox">
        <input
          type="checkbox"
          className="checkbox"
          id="form__checkbox"
          onChange={(e) => inputs.onChange(4, e.target.checked)}
          checked={!!inputs.values[4]}
        />
        <label
          htmlFor="form__checkbox"
          className="checkbox__label">
          Пометить событие как важное
        </label>
      </div>
      <div className="modal__buttons">
        <Button
          value="Готово"
          mod="_submit small"
          key="submitForm"
          onClick={inputs.onSubmitForm.bind(inputs)}
        />
        {
          props.articleData && (
            <Button
              value="Удалить"
              mod="_reset small"
              key="resetForm"
              onClick={props.onDeleteClick(props.articleData[5])}
            />
          )
        }
      </div>
    </div>
  </form>
)
};

export default Form


