import React from 'react';
import { Link } from 'react-router-dom';
import LayoutError from '~/components/layouts/error/LayoutError';
import styles from './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <LayoutError>
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
    </LayoutError>
  );
};

export default ErrorPage;
