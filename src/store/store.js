import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { calendarSagas, calendarReducer } from './ducks/calendar';

const saga = createSagaMiddleware();

const store = createStore(calendarReducer, applyMiddleware(saga));

saga.run(calendarSagas);

export default store;
