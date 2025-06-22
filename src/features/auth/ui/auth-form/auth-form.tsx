import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from '~/shared/model';
import { UiButton } from '~/shared/ui/button';
import { InputField } from '~/shared/ui/input';
import { login, register } from '../../model/actions';
import { AuthFormValues, AuthFormFields } from './types';
import * as styles from './auth-form.module.css';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<AuthFormValues>();
  const { handleSubmit, getValues } = form;

  const onSubmit = handleSubmit((data) => {
    dispatch(login({ user: data }));
  });

  const onRegister = () => {
    dispatch(register({ user: getValues() }));
  };

  return (
    <FormProvider {...form}>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <InputField
          className={styles.login}
          label="Логин"
          name={AuthFormFields.Username}
          type="text"
        />
        <InputField
          className={styles.password}
          label="Пароль"
          name={AuthFormFields.Password}
          type="password"
        />
        <div className={styles.buttons}>
          <UiButton
            htmlType="submit"
            label="Войти"
            size="small"
            type="submit"
          />
          <UiButton
            htmlType="button"
            label="Создать"
            size="small"
            type="reset"
            onClick={onRegister}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
