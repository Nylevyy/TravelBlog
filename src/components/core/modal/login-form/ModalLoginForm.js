import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import UiInput, {
  uiInput_title,
  uiInput_location,
} from '~/components/ui/input/UiInput';
import styles from '~/components/core/modal/login-form/ModalLoginForm.scss';
import UiButton, {
  uiButton_submit,
  uiButton_cancel,
  uiButton_small,
} from '~/components/ui/button/UiButton';

const ccn = classNames.bind(styles);

const ModalLoginForm = ({ isLoggedIn, onSubmitFormClick, onLogOutClick }) => {
  const [inputs, setInputs] = useState({
    values: ['', ''],
    isValid: true,
    onInputChange({ index, value }) {
      if (isLoggedIn) return;
      setInputs((prevInputs) => {
        const newValues = prevInputs.values.slice();
        newValues[index] = value;
        return {
          ...prevInputs,
          values: newValues,
        };
      });
    },
  });
  const onSubmitForm = () => {
    // if (!input.value) {
    //   setInput((prevInput) => ({
    //     ...prevInput,
    //     isValid: false,
    //   }));
    //   return;
    // }
    onSubmitFormClick(
      { login: inputs.values[0], password: inputs.values[1] },
      { type: 'loginForm' }
    );
  };
  return (
    <form className={styles.modalLoginForm} action="">
      <UiInput
        className={ccn(uiInput_title)}
        index={0}
        isValid={inputs.isValid}
        value={inputs.values[0]}
        onInput={inputs.onInputChange}
        onChange={inputs.onInputChange}
        label="Логин"
      />
      <UiInput
        className={ccn(uiInput_location)}
        index={1}
        isValid={inputs.isValid}
        value={inputs.values[1]}
        onInput={inputs.onInputChange}
        onChange={inputs.onInputChange}
        label="Пароль"
      />
      <div className={styles.modalLoginForm__buttons}>
        {(!isLoggedIn && (
          <UiButton
            label="Войти"
            className={ccn(uiButton_submit, uiButton_small)}
            onClick={onSubmitForm}
          />
        )) || (
          <UiButton
            label="Выйти"
            className={ccn(uiButton_cancel, uiButton_small)}
            onClick={onLogOutClick}
          />
        )}
      </div>
    </form>
  );
};

ModalLoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSubmitFormClick: PropTypes.func.isRequired,
  onLogOutClick: PropTypes.func.isRequired,
};

export default ModalLoginForm;
