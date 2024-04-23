import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, appSelectors } from '~/store/ducks/app';
import ErrorPage from '~/components/pages/404/ErrorPage';
import LoginPage from '~/components/pages/login/LoginPage';
import Main from '~/components/pages/main/Main';
import AuthProvider from '~/components/providers/auth/AuthProvider';
import { logInSelector } from '~/store/ducks/app/selectors';
import Loader from './core/loader/Loader';

const { closeModal, initApp } = appActions;
const { appSelector } = appSelectors;

const App = () => {
  const { init, modal, requestError, isFetching } = useSelector((state) =>
    appSelector(state),
  );
  const isLoggedIn = useSelector((state) => logInSelector(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);

  useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <BrowserRouter>
      <>
        {(!init || isFetching || null) && <Loader />}
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

export default App;
