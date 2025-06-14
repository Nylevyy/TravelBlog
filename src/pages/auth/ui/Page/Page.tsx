import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import {
  AuthForm,
  getAuthErrorMessage,
  getIsAuthorized,
} from '~/features/auth';
import { useAppSelector } from '~/shared/model';
import { MinimalisticLayout } from '~/widgets/layouts';
import * as styles from './Page.module.css';

const ccn = classNames.bind(styles);

const Page = () => {
  const authErrorMessage = useAppSelector(getAuthErrorMessage);
  const isLoggedIn = useAppSelector(getIsAuthorized);

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return (
    <MinimalisticLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <span
            className={ccn('message', {
              error: authErrorMessage,
            })}
          >
            {authErrorMessage || 'Пожалуйста, войдите в аккаунт'}
          </span>

          <AuthForm />
        </div>
      </div>
    </MinimalisticLayout>
  );
};

export default Page;
