import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UiLoader } from '~/shared/ui/loader';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { appActions, appSelectors } from '~/store/ducks/app';
import ErrorPage from '~/components/pages/404/ErrorPage';
import LoginPage from '~/components/pages/login/LoginPage';
import Main from '~/components/pages/main/Main';
import AuthProvider from '~/components/providers/auth/AuthProvider';
import { logInSelector } from '~/store/ducks/app/selectors';

const { closeModal, initApp } = appActions;
const { appSelector } = appSelectors;

const Router = () => {
  const { init, modal, requestError, isFetching } = useAppSelector((state) =>
    appSelector(state),
  );
  const isLoggedIn = useAppSelector((state) => logInSelector(state));

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
            <Route
              path="/login"
              element={<LoginPage requestError={requestError} />}
            />

            <Route element={<AuthProvider />}>
              <Route
                path="/"
                element={
                  <Main
                    modal={modal}
                    isLoggedIn={isLoggedIn}
                    requestError={requestError}
                    isFetching={isFetching}
                  />
                }
              />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </>
    </BrowserRouter>
  );
};

export default Router;
