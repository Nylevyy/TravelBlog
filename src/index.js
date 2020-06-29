import React from 'react';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Main from './components/pages/main/Main';
import '~/assets/scss/styles/index.scss';
import reducer from '~/store/reducer';
import 'moment/locale/ru';
import { rootSaga } from '~/store/calendar/calendarActions';

moment.locale('ru');

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));

saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
