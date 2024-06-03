import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from '~/features/auth';
import { articleSaga, articleReducer } from '~/entities/article';

// TODO: remove legacy
import { rootArticlesSaga, articlesReducer } from '~/store/ducks/main/articles';
import { rootMainSaga } from '~/store/ducks/main';
import { appReducer, rootAppSaga } from '~/store/ducks/app';
import { titleSagas, titleReducer } from '~/store/ducks/main/title';

function* rootSaga() {
  yield all([
    rootArticlesSaga(),
    titleSagas(),
    rootMainSaga(),
    rootAppSaga(),
    articleSaga(),
    authSaga(),
  ]);
}

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: articleReducer,
    articles: articlesReducer,
    auth: authReducer,
    // @ts-expect-error TODO
    app: appReducer,
    title: titleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([saga]),
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
