import React from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from '~/components/layouts/errorLayout/ErrorLayout';
import styles from './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <ErrorLayout>
      <div className={styles.errorPage}>
        <h1>
          <strong>Ошибка 404</strong>
        </h1>
        <i>К сожалению, страница не найдена.</i>
        <br />
        <Link to="/">
          <i>Вернитесь на главную</i>
        </Link>
      </div>
    </ErrorLayout>
  );
};

export default ErrorPage;
