import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>
        <strong>Ошибка 404</strong>
      </h1>
      <i>К сожалению, страница не найдена.</i>
      <br />
      <Link to="/">
        <i>Вернитесь на главную</i>
      </Link>
    </div>
  );
};

export default ErrorPage;
