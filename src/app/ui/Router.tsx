import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, getIsAuthorized } from '~/features/auth';
import { AuthPage } from '~/pages/auth';
import { NotFoundPage } from '~/pages/not-found';
import { UiLoader } from '~/shared/ui/loader';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { appActions, appSelectors } from '~/store/ducks/app';
import Main from '~/components/pages/main/Main';

const { closeModal } = appActions;
const { appSelector } = appSelectors;

const Router = () => {
  const { modal, requestError, isFetching } = useAppSelector(appSelector);
  const isLoggedIn = useAppSelector(getIsAuthorized);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);

  return (
    <>
      {(isFetching || null) && <UiLoader />}
      {false}
      <Routes>
        <Route element={<AuthPage />} path="/login" />

        <Route
          path="/"
          element={
            <AuthProvider>
              <Main
                isFetching={isFetching}
                isLoggedIn={isLoggedIn}
                modal={modal}
                requestError={requestError}
              />
            </AuthProvider>
          }
        />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
};

export default Router;
