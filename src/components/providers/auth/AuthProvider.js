import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthorized } from '~/features/auth/model';
import { useAppSelector } from '~/shared/model';

const AuthProvider = () => {
  const isLoggedIn = useAppSelector(getIsAuthorized);

  if (!isLoggedIn) {
    return <Navigate replace to="login" />;
  }

  return <Outlet />;
};

export default AuthProvider;
