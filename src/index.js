import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import store from '~/store/store';
import Main from './components/pages/main/Main';
import '~/assets/scss/styles/index.scss';

moment.locale('ru');

const RootApp = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

render(<RootApp />, document.getElementById('root'));
