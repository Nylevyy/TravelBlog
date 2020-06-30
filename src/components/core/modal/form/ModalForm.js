import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Inputs from './inputs/FormInputs';
import Button from '~/components/ui/button/Button';
import styles from './ModalForm.scss';
import Checkbox from '~/components/ui/checkbox/Checkbox';

const Form = ({ onSubmitFormClick, onDeleteClick, articleData }) => {
  Form.propTypes = {
    onSubmitFormClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func,
    articleData: PropTypes.arrayOf(PropTypes.any),
  };
  const [inputs, setInputs] = useState({
    notValidated: [],
    id: null,
    values: ['', '', new Date(), '', false],
    onInputChange(index, value) {
      setInputs((prevInputs) => {
        const newInputs = prevInputs.values.slice();
        newInputs[index] = value;
        return {
          ...prevInputs,
          values: newInputs,
        };
      });
    },
  });
  useEffect(() => {
    if (!articleData) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        values: ['', '', new Date(), '', false],
        notValidated: [],
        id: null,
      }));
      return;
    }
    const values = articleData.slice(0, 5);
    values[2] = new Date(values[2]);
    setInputs((prevInputs) => ({
      ...prevInputs,
      notValidated: [],
      values,
      id: articleData[5],
    }));
  }, [articleData]);
  const onSubmitForm = () => {
    const emptyFields = [];
    for (let i = 0; i < inputs.values.length - 1; i++) {
      if (!inputs.values[i]) {
        emptyFields.push(i);
      }
    }
    if (emptyFields.length) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        notValidated: emptyFields,
      }));
      return;
    }
    const article = {
      title: inputs.values[0],
      location: inputs.values[1],
      date: inputs.values[2],
      description: inputs.values[3],
      isImportant: inputs.values[4],
    };
    setInputs((prevInputs) => ({
      ...prevInputs,
      notValidated: [],
    }));
    onSubmitFormClick(article, inputs.id);
  };

  return (
    <form action="" className={styles.form}>
      <Inputs
        values={[
          inputs.values[0],
          inputs.values[1],
          inputs.values[2],
          inputs.values[3],
        ]}
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
            className="button_submit"
            key="submitForm"
            onClick={onSubmitForm}
            isSmall
          />
          {articleData && (
            <Button
              value="Удалить"
              className="button_reset"
              key="resetForm"
              onClick={onDeleteClick(articleData[5])}
              isSmall
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
