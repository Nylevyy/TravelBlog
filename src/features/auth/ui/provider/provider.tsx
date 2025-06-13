import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/shared/model';
import { UiLoader } from '~/shared/ui/loader';
import { getIsAuthorized, getIsAuthPerformed } from '../../model';

const Provider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const isAuthPerformed = useAppSelector(getIsAuthPerformed);
  const isLoggedIn = useAppSelector(getIsAuthorized);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isAuthPerformed]);

  if (!isAuthPerformed) {
    return <UiLoader />;
  }

  return isLoggedIn ? children : null;;
};

export default Provider;
