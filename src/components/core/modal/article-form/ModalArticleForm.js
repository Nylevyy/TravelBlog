import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UiButton } from '~/shared/ui/button';
import { UiCheckbox } from '~/shared/ui/checkbox';
import * as styles from './ModalArticleForm.scss';
import ArticleFormInputs from './inputs/ArticleFormInputs';

const ModalArticleForm = ({ onSubmitFormClick, onDeleteClick, data }) => {
  const [inputs, setInputs] = useState({
    notValidated: [],
    id: null,
    values: ['', '', new Date(), '', false],
    onInputChange({ index, value }) {
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
    if (!data) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        values: ['', '', new Date(), '', false],
        notValidated: [],
        id: null,
      }));
      return;
    }
    const { title, location, date, description, isImportant, id } = data;
    const dateValue = new Date(date);
    setInputs((prevInputs) => ({
      ...prevInputs,
      notValidated: [],
      values: [title, location, dateValue, description, isImportant],
      id,
    }));
  }, [data]);
  const onSubmitForm = () => {
    const emptyFields = [];
    for (let i = 0; i < inputs.values.length - 1; i++) {
      let value = inputs.values[i];
      if (typeof value === 'string') value = value.trim();
      if (!value) {
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
      date: new Date(inputs.values[2]).toISOString(),
      description: inputs.values[3],
      isImportant: inputs.values[4],
    };
    setInputs((prevInputs) => ({
      ...prevInputs,
      notValidated: [],
    }));
    onSubmitFormClick(
      {
        article,
      },
      {
        id: inputs.id,
        type: 'articleEditor',
      },
    );
  };

  return (
    <form action="" className={styles.modalArticleForm}>
      <ArticleFormInputs
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

      <div className={styles.modalArticleForm__dashboard}>
        <UiCheckbox
          index={4}
          label=" Пометить событие как важное"
          onChange={inputs.onInputChange}
          checked={!!inputs.values[4]}
          id="articleForm__checkbox"
        />
        <div className={styles.modalArticleForm__buttons}>
          <UiButton
            htmlProps={{ type: 'submit' }}
            label="Готово"
            size="small"
            type="submit"
          />
          {data && (
            <UiButton
              label="Удалить"
              type="reset"
              size="small"
              onClick={onDeleteClick(data.id)}
            />
          )}
        </div>
      </div>
    </form>
  );
};

ModalArticleForm.propTypes = {
  onSubmitFormClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  data: PropTypes.exact({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isImportant: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default ModalArticleForm;
