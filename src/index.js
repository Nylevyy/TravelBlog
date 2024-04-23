import React from 'react';
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RootApp tab="home" />);
