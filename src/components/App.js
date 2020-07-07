import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, appSelectors } from '~/store/ducks/app';
import ErrorPage from '~/components/pages/404/ErrorPage';
import Main from '~/components/pages/main/Main';
import Loader from './core/loader/Loader';

const { closeModal, initApp } = appActions;
const { appSelector } = appSelectors;

const App = () => {
  const { init, modal, requestError, isFetching } = useSelector((state) =>
    appSelector(state)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);
  useEffect(() => {
    dispatch(initApp());
  }, []);
  return (
    <BrowserRouter>
      {!init && <Loader />}
      {init && (
        <Switch>
          <Route exact path="/">
            <Main
              modal={modal}
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
