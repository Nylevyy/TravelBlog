import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '~/shared/model';
import { getIsAuthorized } from '../../model';

const Guard = () => {
  const isLoggedIn = useAppSelector(getIsAuthorized);

  if (!isLoggedIn) {
    return <Navigate replace to="login" />;
  }

  return <Outlet />;
};

export default Guard;
