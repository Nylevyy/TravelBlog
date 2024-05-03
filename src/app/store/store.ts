import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
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
  ]);
}

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: articleReducer,
    articles: articlesReducer,
    // @ts-expect-error TODO
    app: appReducer,
    title: titleReducer,
  },
  // @ts-expect-error TODO
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([saga]),
});

saga.run(rootSaga);
