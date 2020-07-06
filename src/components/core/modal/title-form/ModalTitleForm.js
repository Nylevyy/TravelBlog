import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '~/components/ui/input/Input';
import styles from '~/components/core/modal/article-form/ModalArticleForm.scss';
import Button from '~/components/ui/button/Button';

const ModalTitleForm = ({ title, onSubmitFormClick }) => {
  ModalTitleForm.propTypes = {
    title: PropTypes.string,
    onSubmitFormClick: PropTypes.func.isRequired,
  };
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
      <Input
        name="title"
        isValid={input.isValid}
        value={input.value}
        onInput={input.onInputChange}
        onChange={input.onInputChange}
        label="Заголовок"
      />
      <div className={styles.modalTitleForm__buttons}>
        <Button
          value="Готово"
          className="button_submit"
          key="submitForm"
          onClick={onSubmitForm}
          isSmall
        />
      </div>
    </form>
  );
};

export default ModalTitleForm;
