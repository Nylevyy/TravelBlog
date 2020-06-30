import React from 'react';
import axios from 'axios';
import LayoutContainer from '~/containers/LayoutContainer';
import CalendarContainer from '~/containers/CalendarContainer';

const Main = () => {
  const onBtnClick = async () => {
    const res = await axios.request({
      method: 'POST',
      url: 'http://localhost:3001/api/calendarData',
      params: { foo: 'bar' },
      data: { fullName: 'Ivan' },
    });
    console.log('onBtnClick', res);
  };

  return (
    <LayoutContainer>
      <button type="button" onClick={onBtnClick}>
        Click me!
      </button>
      <CalendarContainer />
    </LayoutContainer>
  );
};

export default Main;
