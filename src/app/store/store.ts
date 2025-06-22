import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from '~/features/auth';
import { rootMainPageSaga } from '~/pages/home';
import { userConfigReducer, userConfigSaga } from '~/entities/user-config';
import { loaderReducer } from '~/shared/ui/loader';
import { articleSaga, articleReducer } from '~/entities/article';

function* rootSaga() {
  yield all([articleSaga(), authSaga(), userConfigSaga(), rootMainPageSaga()]);
}

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: articleReducer,
    auth: authReducer,
    userConfig: userConfigReducer,
    loader: loaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([saga]),
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
