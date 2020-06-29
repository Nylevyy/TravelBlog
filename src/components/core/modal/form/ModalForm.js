import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Inputs from './inputs/FormInputs';
import Button from '../../../ui/button/Button';
import styles from './ModalForm.scss';
import Checkbox from '~/components/ui/checkbox/Checkbox';

const Form = (
  {
    onSubmitFormClick,
    onDeleteClick,
    articleData,
  },
) => {
  Form.propTypes = {
    onSubmitFormClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func,
    articleData: PropTypes.arrayOf(PropTypes.any),
  };
  const [inputs, setInputs] = useState(
    {
      notValidated: [],
      isEditMode: false,
      id: Date.now(),
      values: ['', '', new Date(), '', false],
      onInputChange(index, value) {
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
      /*
      onSubmitForm() {
        const emptyFields = [];
        for (let i = 0; i < inputs.values.length - 1; i++) {
          console.log(inputs.values[i]);
          console.log(!!inputs.values[i]);
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
          id: articleData ? articleData[5] : Date.now(),
        };
        setInputs((prevInputs) => (
          {
            ...prevInputs,
            notValidated: [],
          }
        ));
        const isEditMode = !!articleData;
        onSubmitFormClick(article, isEditMode);
      }, */
      onSubmitForm() {
        let article;
        let isEditing;
        setInputs((prevInputs) => {
          const emptyFields = [];
          for (let i = 0; i < prevInputs.values.length - 1; i++) {
            if (!prevInputs.values[i]) {
              emptyFields.push(i);
            }
          }
          if (emptyFields.length) {
            return (
              {
                ...prevInputs,
                notValidated: emptyFields,
              }
            );
          }
          isEditing = prevInputs.isEditMode;
          article = {
            title: prevInputs.values[0],
            location: prevInputs.values[1],
            date: prevInputs.values[2],
            description: prevInputs.values[3],
            isImportant: prevInputs.values[4],
            id: prevInputs.id,
          };
          return (
            {
              ...prevInputs,
              notValidated: [],
            }
          );
        });
        if (!article) return;
        onSubmitFormClick(article, isEditing);
      },
    },
  );
  useEffect(() => {
    if (!articleData) {
      setInputs((prevInputs) => (
        {
          ...prevInputs,
          values: ['', '', new Date(), '', false],
          notValidated: [],
          isEditMode: false,
          id: Date.now(),
        }
      ));
      return;
    }
    const values = articleData.slice(0, 5);
    values[2] = new Date(values[2]);
    setInputs((prevInputs) => (
      {
        ...prevInputs,
        notValidated: [],
        values,
        isEditMode: true,
        id: values[5],
      }
    ));
  }, [articleData]);

  return (
    <form
      action=""
      className={styles.form}
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
        onChange={inputs.onInputChange}
        onInput={inputs.onInputChange}
        notValidated={inputs.notValidated}
        onChangeDate={inputs.onChangeDate}
      />

      <div className={styles.form__dashboard}>
        <Checkbox
          index={4}
          label=" Пометить событие как важное"
          onChange={inputs.onInputChange}
          checked={!!inputs.values[4]}
          id="form__checkbox"
        />
        <div className={styles.form__buttons}>
          <Button
            value="Готово"
            className="button_submit button_small"
            key="submitForm"
            onClick={inputs.onSubmitForm}
          />
          {
            articleData && (
              <Button
                value="Удалить"
                className="button_reset button_small"
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
