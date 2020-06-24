import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import BeatLoader from 'react-spinners/BeatLoader';
import './MainCalendar.scss';
import CalendarItem from './item/CalendarItem';

const MainCalendar = (
  {
    calendarData: {
      dataStatus,
      articles,
      onDeleteArticleClick,
      onArticleClick,
      requestError,
    },
  },
) => {
  MainCalendar.propTypes = {
    calendarData: PropTypes.exact(
      {
        dataStatus: PropTypes.string,
        articles: PropTypes.arrayOf(PropTypes.object),
        onDeleteArticleClick: PropTypes.func,
        onArticleClick: PropTypes.func,
        requestError: PropTypes.number,
      },
    ),
  };
  let cachedDate = '';
  return (
    <div className="main-calendar">
      <div className="main-calendar__container">
        {
          (dataStatus === 'fetching') && (
            <div className="main-calendar_empty">
              {/* <div id="fountainG">
                <div id="fountainG_1" className="fountainG"/>
                <div id="fountainG_2" className="fountainG"/>
                <div id="fountainG_3" className="fountainG"/>
                <div id="fountainG_4" className="fountainG"/>
                <div id="fountainG_5" className="fountainG"/>
                <div id="fountainG_6" className="fountainG"/>
                <div id="fountainG_7" className="fountainG"/>
                <div id="fountainG_8" className="fountainG"/>
              </div> */}
              <BeatLoader loading="true" />
            </div>
          )
        }
        {
          (dataStatus === 'failed to fetch') && (
            <div className="main-calendar_empty">
              <h3>Ошибка соединения с сервером</h3>
              <h3>Пожалуйста, повторите попытку</h3>
            </div>
          )
        }
        {
          (!articles.length) && (dataStatus === 'loaded') && (
            <div className="main-calendar_empty">
              <h1>No Articles found</h1>
              <h3>Try to create a new one by clicking the button above</h3>
            </div>
          )
        }
        {
          articles.sort((a, b) => {
            if (a.date > b.date) return -1;
            return 1;
          }).map((item) => {
            const currentDate = moment(item.date).format('D MMMM');
            if (cachedDate !== currentDate) {
              cachedDate = currentDate;
              return (
                <React.Fragment key={currentDate}>
                  <div className="main-calendar__date">
                    <h3>{currentDate}</h3>
                  </div>
                  <CalendarItem
                    {...item}
                    key={item.id}
                    onDeleteArticleClick={onDeleteArticleClick}
                    onArticleClick={onArticleClick}
                    hasRequestError={requestError === item.id}
                  />
                </React.Fragment>
              );
            }
            return (
              <CalendarItem
                {...item}
                key={item.id}
                onDeleteArticleClick={onDeleteArticleClick}
                onArticleClick={onArticleClick}
                hasRequestError={requestError === item.id}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default MainCalendar;
