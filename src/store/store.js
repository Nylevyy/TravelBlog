import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from '@redux-saga/core/effects';
import { calendarSagas, calendarReducer } from './ducks/calendar';
import { appReducer } from './ducks/app';
import { headerSagas, headerReducer } from './ducks/header';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  app: appReducer,
  header: headerReducer,
});

function* rootSaga() {
  yield all([calendarSagas(), headerSagas()]);
}

const saga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(saga));

saga.run(rootSaga);

export default store;
