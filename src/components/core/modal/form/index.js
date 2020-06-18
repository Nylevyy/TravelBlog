import React, {useState} from "react";
import Inputs from "./inputs";
import Button from "../../../ui/button";
import "./index.scss"

function Form(props) {
  const [inputs, setInputs] = useState(
    {
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
            return inputs
          }
          if (i === 2) {
            if (!inputs.validateTime(this.values[2])) {
              alert('Неверно указано время');
              return inputs
            }
          }
        }
        const article = {
          title: this.values[0],
          location: this.values[1],
          time: this.values[2],
          description: this.values[3],
          isImportant: this.values[4],
          id: Date.now()
        };
        const date = this.getDate();
        props.onSubmitFormClick(date, article);
        setInputs(inputs => {
          return {
            ...inputs,
            values: ['', '', '', '', false]
          }
        })
      },
      getDate() {
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const monthNames = [" января", " февраля", " марта", " апреля", " мая", " июня",
          " июля", " августа", " сентября", " октября", " ноября", " декабря"];
        const monthName = monthNames[month];
        return (day + monthName)
      },
    }
  );

  /* function onSubmitForm() {
     for (let i = 0; i < inputs.values.length - 1; i++) {
       if (!inputs.values[i]) {
         alert("Не все поля заполнены");
         return
       }
       if (i === 2) {
         if (!validateTime(inputs.values[2])) {
           alert('Неверно указано время');
           return
         }
       }
     }
     const article = {
       title: inputs.values[0],
       location: inputs.values[1],
       time: inputs.values[2],
       description: inputs.values[3],
       isImportant: inputs.values[4],
       id: Date.now()
     };
     const date = getDate();
     props.onSubmitFormClick(date, article);
     props.closeModal();
     setInputs(inputs => {
       return {
         ...inputs,
         values: ['', '', '', '', false]
       }
     })
   }

   function maskInputTime(value) {
     if (value.match(/[^0-9:]+/g)) return false;
     if (value.length === 2) {
       if (!value.includes(':')) (value += ':')
     } else if (value.length > 5) return false;
     return value
   }

   function validateTime(value) {
     if (!value.match(/[0-1]\d[:][0-5]\d/)) {
       return !!value.match(/[2][0-3][:][0-5]\d/);
     } else return true;
   }

   function getDate() {
     const day = new Date().getDate();
     const month = new Date().getMonth();
     const monthNames = [" января", " февраля", " марта", " апреля", " мая", " июня",
       " июля", " августа", " сентября", " октября", " ноября", " декабря"];
     const monthName = monthNames[month];
     return (day + monthName)
   }*/

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
          <Button
            value="Удалить"
            mod="_reset small"
            key="resetForm"
            onClick={props.onDeleteClick}
          />
        </div>
      </div>
    </form>
  )
}

export default Form


