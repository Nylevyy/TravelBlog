import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import UiInput from '~/components/ui/input/UiInput';
import styles from '~/components/core/modal/title-form/ModalTitleForm.scss';
import UiButton, {
  uiButton_submit,
  uiButton_small,
} from '~/components/ui/button/UiButton';

const ccn = classNames.bind(styles);

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
          className={ccn(uiButton_submit, uiButton_small)}
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
