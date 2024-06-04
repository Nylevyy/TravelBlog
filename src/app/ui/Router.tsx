import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthGuard, getIsAuthorized } from '~/features/auth';
import { AuthPage } from '~/pages/auth';
import { NotFoundPage } from '~/pages/not-found';
import { UiLoader } from '~/shared/ui/loader';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { appActions, appSelectors } from '~/store/ducks/app';
import Main from '~/components/pages/main/Main';

const { closeModal, initApp } = appActions;
const { appSelector } = appSelectors;

const Router = () => {
  const { init, modal, requestError, isFetching } = useAppSelector(appSelector);
  const isLoggedIn = useAppSelector(getIsAuthorized);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);

  useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <BrowserRouter>
      <>
        {(!init || isFetching || null) && <UiLoader />}
        {init && (
          <Routes>
            <Route element={<AuthPage />} path="/login" />

            <Route element={<AuthGuard />}>
              <Route
                path="/"
                element={
                  <Main
                    isFetching={isFetching}
                    isLoggedIn={isLoggedIn}
                    modal={modal}
                    requestError={requestError}
                  />
                }
              />
            </Route>

            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        )}
      </>
    </BrowserRouter>
  );
};

export default Router;
