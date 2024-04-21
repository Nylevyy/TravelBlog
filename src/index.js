import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { store } from '~/store/store';
import '~/assets/scss/styles/index.scss';
import App from '~/components/App';

moment.locale('ru');

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<RootApp />, document.getElementById('root'));
