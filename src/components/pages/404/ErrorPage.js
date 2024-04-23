import React from 'react';
import { Link } from 'react-router-dom';
import LayoutError from '~/components/layouts/error/LayoutError';
import * as styles from './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <LayoutError>
      <div className={styles.errorPage}>
        <h1>Ошибка 404</h1>
        <i>К сожалению, страница не найдена.</i>
        <br />
        <br />
        <br />
        <br />
        <Link to="/">
          <span className={styles.errorPage__link}>
            Нажмите, чтобы вернуться на главную
          </span>
        </Link>
      </div>
    </LayoutError>
  );
};

export default ErrorPage;
