import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Inputs from './inputs/FormInputs';
import Button from '../../../ui/button/Button';
import './ModalForm.scss';
import moment from 'moment';

const Form = (
  {
    onSubmitFormClick,
    onDeleteClick,
    articleData,
  },
) => {
  Form.defaultProps = {
    articleData: ['', moment(), '', '', false, Date.now()],
  };
  Form.propTypes = {
    onSubmitFormClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    articleData: PropTypes.arrayOf(PropTypes.any),
  };
  const [inputs, setInputs] = useState(
    {
      notValidated: [],
      articleData,
      isEditMode: false,
      values: ['', '', '', '', false],
      onInput(index, value) {
        setInputs((prevInputs) => {
          const newInputs = prevInputs.values.slice();
          newInputs[index] = value;
          return (
            {
              ...prevInputs,
              values: newInputs,
            }
          );
        });
      },
      onChange(index, value = '') {
        setInputs((prevInputs) => {
          const newInputs = prevInputs.values.slice();
          newInputs[index] = value;
          return (
            {
              ...prevInputs,
              values: newInputs,
            }
          );
        });
      },
      onSubmitForm() {
        const emptyFields = [];
        for (let i = 0; i < inputs.values.length - 1; i++) {
          if (!inputs.values[i]) {
            emptyFields.push(i);
          }
        }
        if (emptyFields.length) {
          setInputs((prevInputs) => (
            {
              ...prevInputs,
              notValidated: emptyFields,
            }
          ));
          return;
        }
        const article = {
          title: inputs.values[0],
          location: inputs.values[1],
          date: inputs.values[2],
          description: inputs.values[3],
          isImportant: inputs.values[4],
          id: inputs.id,
        };
        setInputs((prevInputs) => (
          {
            ...prevInputs,
            notValidated: [],
          }
        ));
        onSubmitFormClick(article, inputs.isEditMode);
      },
    },
  );
  useEffect(() => {
    /* if (!articleData) {
      setInputs(inputs => (
        {
          ...inputs,
          notValidated: [],
          articleData: null,
          isEditMode: false,
          values: ['', '', '', '', false],
          id: Date.now(),
        }
      ));
    } else { */
      const values = articleData.slice(0, 5);
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
      ));
    }
  }, [articleData]);

  return (
    <form
      action=""
      className="form"
    >
      <Inputs
        values={
          [
            inputs.values[0],
            inputs.values[1],
            inputs.values[2],
            inputs.values[3],
          ]
        }
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
                onClick={onDeleteClick(articleData[5])}
              />
            )
          }
        </div>
      </div>
    </form>
  );
};

export default Form;
