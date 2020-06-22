import React, {useEffect, useState} from "react";
import Inputs from "./inputs";
import Button from "../../../ui/button";
import "./index.scss";
import moment from "moment";

const Form = (props) => {
  const [inputs, setInputs] = useState(
    {
      notValidated: [],
      articleData: null,
      isEditMode: false,
      values: ['', '', '', '', false],
      onInput(index, value) {
        let newValue = value;
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
          newValue = value ? value : '';
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
      onSubmitForm() {
        const emptyFields = [];
        for (let i = 0; i < this.values.length - 1; i++) {
          if (!this.values[i]) {
            emptyFields.push(i);
          }
        }
        if (emptyFields.length) {
          setInputs(inputs => (
            {
              ...inputs,
              notValidated: emptyFields,
            }
          ));
          return;
        }
        const article = {
          title: this.values[0],
          location: this.values[1],
          date: this.values[2],
          description: this.values[3],
          isImportant: this.values[4],
          id: this.id
        };
        setInputs(inputs => (
          {
            ...inputs,
            notValidated: [],
          }
        ));
        props.onSubmitFormClick(article, this.isEditMode);
      },
    }
  );
  useEffect(() => {
    if (!props.articleData) {
      setInputs(inputs => (
        {
          ...inputs,
          notValidated: [],
          articleData: null,
          isEditMode: false,
          values: ['', '', '', '', false],
          id: Date.now(),
        }
      ))
    } else {
      const values = props.articleData.slice(0, 5);
      values[2] = new Date(values[2]);
      setInputs(inputs => (
        {
          ...inputs,
          notValidated: [],
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
        notValidated={inputs.notValidated}
        onChangeDate={inputs.onChangeDate}
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


