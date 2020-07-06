import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './Calendar.scss';
import CalendarItem from './item/CalendarItem';

const Calendar = ({
  requestError,
  articles,
  onDeleteClick,
  onArticleClick,
}) => {
  Calendar.propTypes = {
    requestError: PropTypes.bool.isRequired,
    articles: PropTypes.arrayOf(PropTypes.object),
    onDeleteClick: PropTypes.func.isRequired,
    onArticleClick: PropTypes.func.isRequired,
  };
  let cachedDate = '';
  return (
    <div className={styles.mainCalendar}>
      <div className={styles.mainCalendar__container}>
        {requestError && (
          <div className={styles.mainCalendar_empty}>
            <h3>Ошибка соединения с сервером</h3>
            <h3>Пожалуйста, повторите попытку</h3>
          </div>
        )}
        {!articles.length && !requestError && (
          <div className={styles.mainCalendar_empty}>
            <h1>No Articles found</h1>
            <h3>Try to create a new one by clicking the button above</h3>
          </div>
        )}
        {!requestError &&
          articles
            .sort((a, b) => {
              if (a.date > b.date) return -1;
              return 1;
            })
            .map((item) => {
              const currentDate = moment(item.date).format('D MMMM');
              if (cachedDate !== currentDate) {
                cachedDate = currentDate;
                return (
                  <React.Fragment key={currentDate}>
                    <div className={styles.mainCalendar__date}>
                      <h3>{currentDate}</h3>
                    </div>
                    <CalendarItem
                      {...item}
                      key={item.id}
                      onDeleteClick={onDeleteClick}
                      onArticleClick={onArticleClick}
                    />
                  </React.Fragment>
                );
              }
              return (
                <CalendarItem
                  {...item}
                  key={item.id}
                  onDeleteClick={onDeleteClick}
                  onArticleClick={onArticleClick}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Calendar;
