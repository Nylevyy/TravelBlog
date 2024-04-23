import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from '@redux-saga/core/effects';
import { rootArticlesSaga, articlesReducer } from './ducks/main/articles';
import { rootMainSaga } from './ducks/main';
import { appReducer, rootAppSaga } from './ducks/app';
import { titleSagas, titleReducer } from './ducks/main/title';

function* rootSaga() {
  yield all([rootArticlesSaga(), titleSagas(), rootMainSaga(), rootAppSaga()]);
}

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    app: appReducer,
    title: titleReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), saga],
});

saga.run(rootSaga);
