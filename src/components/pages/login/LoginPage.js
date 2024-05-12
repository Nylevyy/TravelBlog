import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { UiButton } from '~/shared/ui/button';
import { UiInput } from '~/shared/ui/input';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import LayoutError from '~/components/layouts/error/LayoutError';
import { join, requestLogIn } from '~/store/ducks/app/actions';
import { logInSelector } from '~/store/ducks/app/selectors';
import * as styles from './LoginPage.scss';

const ccn = classNames.bind(styles);

const LoginPage = ({ requestError }) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => logInSelector(state));

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
              className={ccn('loginPage__titleInput')}
              isValid={inputs.isValid}
              onChange={(value) => inputs.onInputChange({ index: 0, value })}
              htmlProps={{ type: 'text', value: inputs.values[0] }}
              label="Логин"
            />
            <UiInput
              className={ccn('loginPage__passwordInput')}
              isValid={inputs.isValid}
              onChange={(value) => inputs.onInputChange({ index: 1, value })}
              htmlProps={{ type: 'password', value: inputs.values[1] }}
              label="Пароль"
            />
            <div className={styles.loginPage__buttons}>
              <UiButton
                label="Войти"
                type="submit"
                size="small"
                onClick={onSubmitForm}
              />
              <UiButton
                label="Создать"
                type="reset"
                size="small"
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
