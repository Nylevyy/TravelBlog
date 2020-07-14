import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from '@redux-saga/core/effects';
import { rootArticlesSaga, articlesReducer } from './ducks/main/articles';
import { rootMainSaga } from './ducks/main';
import { appReducer } from './ducks/app';
import { titleSagas, titleReducer } from './ducks/main/title';

const rootReducer = combineReducers({
  articles: articlesReducer,
  app: appReducer,
  title: titleReducer,
});

function* rootSaga() {
  yield all([rootArticlesSaga(), titleSagas(), rootMainSaga()]);
}

const saga = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(saga));

saga.run(rootSaga);
