import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '~/store/ducks/app';
import { calendarActions } from '~/store/ducks/calendar';
import { headerActions } from '~/store/ducks/header';
import ErrorPage from '~/components/pages/404/ErrorPage';
import Main from '~/components/pages/main/Main';

const { setTitle } = headerActions;
const { closeModal, openModal } = appActions;
const {
  updateArticle,
  postNewArticle,
  deleteArticle,
  refreshArticles,
} = calendarActions;

const App = () => {
  const appData = useSelector((state) => state.app);
  const { modal, requestError, isFetching } = appData;
  const dispatch = useDispatch();
  const onModalCloseClick = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);
  const onSubmitFormClick = useCallback(
    (payload, { type, id }) => {
      if (type === 'articleEditor') {
        if (id) {
          dispatch(updateArticle({ ...payload, id }));
          return;
        }
        dispatch(postNewArticle({ ...payload }));
        return;
      }
      dispatch(setTitle({ ...payload }));
    },
    [dispatch]
  );
  const onDeleteClick = useCallback(
    (id) => {
      return () => {
        dispatch(deleteArticle({ id }));
      };
    },
    [dispatch]
  );
  const onArticleClick = useCallback(
    (payload) => {
      dispatch(openModal({ ...payload }));
    },
    [dispatch]
  );
  const calendar = useSelector((state) => state.calendar);
  useEffect(() => {
    if (!isFetching) dispatch(closeModal());
  }, [isFetching]);
  useEffect(() => {
    dispatch(refreshArticles());
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Main
          modal={modal}
          onModalCloseClick={onModalCloseClick}
          onSubmitFormClick={onSubmitFormClick}
          onDeleteClick={onDeleteClick}
          onArticleClick={onArticleClick}
          calendar={calendar}
          requestError={requestError}
        />
      </Route>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default App;
// todo: init func, cycle, 404, namings, html
