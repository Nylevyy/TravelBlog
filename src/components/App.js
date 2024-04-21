import React, { useEffect, useCallback } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, appSelectors } from '~/store/ducks/app';
import ErrorPage from '~/components/pages/404/ErrorPage';
import LoginPage from '~/components/pages/login/LoginPage';
import Main from '~/components/pages/main/Main';
import Loader from './core/loader/Loader';

const { closeModal, initApp, join, requestLogIn } = appActions;
const { appSelector, logInSelector } = appSelectors;

const App = () => {
  const { init, modal, requestError, isFetching } = useSelector((state) =>
    appSelector(state),
  );
  const isLoggedIn = useSelector((state) => logInSelector(state));
  const dispatch = useDispatch();
  const onJoinClick = useCallback(
    (userInfo) => {
      dispatch(join({ userInfo }));
    },
    [dispatch],
  );
  const onLogInClick = useCallback(
    (userInfo) => {
      dispatch(requestLogIn({ ...userInfo }));
    },
    [dispatch],
  );
  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);
  useEffect(() => {
    dispatch(initApp());
  }, []);
  return (
    <BrowserRouter>
      {(!init || isFetching || null) && <Loader />}
      {init && (
        <Switch>
          <Route path="/login">
            {isLoggedIn && <Redirect to="/" />}
            <LoginPage
              onJoinClick={onJoinClick}
              onLogInClick={onLogInClick}
              requestError={requestError}
            />
          </Route>
          <Route exact path="/">
            {!isLoggedIn && <Redirect to="/login" />}
            <Main
              modal={modal}
              isLoggedIn={isLoggedIn}
              requestError={requestError}
              isFetching={isFetching}
            />
          </Route>
          <Route path="*" component={ErrorPage} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
