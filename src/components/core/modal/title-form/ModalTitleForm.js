import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UiButton } from '~/shared/ui/button';
import { UiInput } from '~/shared/ui/input';
import * as styles from './ModalTitleForm.scss';

const ModalTitleForm = ({ title, onSubmitFormClick }) => {
  const [input, setInput] = useState({
    value: '',
    isValid: true,
    onInputChange({ value }) {
      setInput((prevInput) => ({
        ...prevInput,
        value,
      }));
    },
  });
  useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      value: title,
      isValid: true,
    }));
  }, [title]);
  const onSubmitForm = () => {
    if (!input.value) {
      setInput((prevInput) => ({
        ...prevInput,
        isValid: false,
      }));
      return;
    }
    onSubmitFormClick({ title: input.value }, { type: 'titleEditor' });
  };
  return (
    <form className={styles.modalTitleForm} action="">
      <UiInput
        name="title"
        isValid={input.isValid}
        value={input.value}
        onInput={input.onInputChange}
        onChange={input.onInputChange}
        label="Заголовок"
      />
      <div className={styles.modalTitleForm__buttons}>
        <UiButton
          label="Готово"
          type="submit"
          size="small"
          onClick={onSubmitForm}
        />
      </div>
    </form>
  );
};

ModalTitleForm.propTypes = {
  title: PropTypes.string,
  onSubmitFormClick: PropTypes.func.isRequired,
};

export default ModalTitleForm;
