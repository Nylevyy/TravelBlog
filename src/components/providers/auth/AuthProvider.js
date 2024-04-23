import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { logInSelector } from '~/store/ducks/app/selectors';

const AuthProvider = () => {
  const isLoggedIn = useSelector((state) => logInSelector(state));

  if (!isLoggedIn) {
    return <Navigate replace to="login" />;
  }

  return <Outlet />;
};

export default AuthProvider;
