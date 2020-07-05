import React from 'react';
import { render } from 'react-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import Main from '~/components/pages/main/Main';
import '~/assets/scss/styles/index.scss';

moment.locale('ru');

const RootApp = () => {
  const appData = useSelector((state) => state.app);
  return <Main {...appData} />;
};

render(<RootApp />, document.getElementById('root'));
