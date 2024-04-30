import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/shared/model';
import { logInSelector } from '~/store/ducks/app/selectors';

const AuthProvider = () => {
  const isLoggedIn = useAppSelector((state) => logInSelector(state));

  if (!isLoggedIn) {
    return <Navigate replace to="login" />;
  }

  return <Outlet />;
};

export default AuthProvider;
