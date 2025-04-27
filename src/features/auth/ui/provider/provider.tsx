import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { UiLoader } from '~/shared/ui/loader';
import { authorize, getIsAuthorized, getIsAuthPerformed } from '../../model';

const Provider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthPerformed = useAppSelector(getIsAuthPerformed);
  const isLoggedIn = useAppSelector(getIsAuthorized);

  useEffect(() => {
    dispatch(authorize());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthPerformed && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isAuthPerformed]);

  if (!isAuthPerformed) {
    return <UiLoader />;
  }

  return isLoggedIn ? children : null;;
};

export default Provider;
