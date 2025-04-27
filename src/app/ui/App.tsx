import 'moment/locale/ru';
import moment from 'moment';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import Router from './Router';

import '~/shared/scss/styles/index.scss';

moment.locale('ru');

export const RootApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};
