import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import UiInput, {
  uiInput_title,
  uiInput_location,
} from '~/components/ui/input/UiInput';
import LayoutError from '~/components/layouts/error/LayoutError';
import UiButton, {
  uiButton_submit,
  uiButton_reset,
  uiButton_small,
} from '~/components/ui/button/UiButton';
import { join, requestLogIn } from '~/store/ducks/app/actions';
import { logInSelector } from '~/store/ducks/app/selectors';
import * as styles from './LoginPage.scss';

const ccn = classNames.bind(styles);

const LoginPage = ({ requestError }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => logInSelector(state));

  const [inputs, setInputs] = useState({
    values: ['', ''],
    isValid: true,
    onInputChange({ index, value }) {
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

  const onJoinClick = useCallback(
    (userInfo) => {
      dispatch(join({ userInfo }));
    },
    [dispatch],
  );
  const onLogInClick = useCallback(
    (userInfo) => {
      dispatch(requestLogIn({ ...userInfo }));
    },
    [dispatch],
  );

  const onSubmitForm = () => {
    onLogInClick({ username: inputs.values[0], password: inputs.values[1] });
  };
  const onCreateUserClick = () => {
    onJoinClick({ username: inputs.values[0], password: inputs.values[1] });
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <LayoutError>
      <div className={styles.loginPage}>
        <div className={styles.loginPage__container}>
          <span
            className={ccn('loginPage__message', {
              loginPage__message_error: requestError,
            })}
          >
            {(requestError && 'Неправильно введен логин или пароль') ||
              'Пожалуйста, войдите в аккаунт'}
          </span>
          <form action="*" className={styles.loginPage__form}>
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
              type="password"
            />
            <div className={styles.loginPage__buttons}>
              <UiButton
                label="Войти"
                className={ccn(uiButton_submit, uiButton_small)}
                onClick={onSubmitForm}
              />
              <UiButton
                label="Создать"
                className={ccn(uiButton_reset, uiButton_small)}
                onClick={onCreateUserClick}
              />
            </div>
          </form>
        </div>
      </div>
    </LayoutError>
  );
};

LoginPage.propTypes = {
  requestError: PropTypes.bool,
};

export default LoginPage;
