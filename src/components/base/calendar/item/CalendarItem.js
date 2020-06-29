import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import CloseButton from '../../../ui/closeButton/CloseButton';
import styles from './CalendarItem.scss';

const calendarItemClasses = classNames.bind(styles);

const CalendarItem = ({
  isImportant,
  id,
  onArticleClick,
  hasRequestError,
  title,
  location,
  date,
  description,
  onDeleteArticleClick,
}) => {
  CalendarItem.propTypes = {
    hasRequestError: PropTypes.number,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isImportant: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onArticleClick: PropTypes.func.isRequired,
    onDeleteArticleClick: PropTypes.func.isRequired,
  };
  return (
    <article
      className={calendarItemClasses({
        calendarItem: true,
        calendarItem_important: isImportant,
      })}
      key={id}
    >
      <button
        className={styles.calendarItem__wrapper}
        type="button"
        onClick={() => {
          onArticleClick([title, location, date, description, isImportant, id]);
        }}
        aria-label="article-edit"
      >
        {hasRequestError && (
          <div className={styles.calendarItem__errorLog}>
            <span className={styles.calendarItem__errorSpan}>
              Ошибка при выполнении запроса на сервер
            </span>
          </div>
        )}
        <div className={styles.calendarItem__info}>
          <div className={styles.calendarItem__time}>
            {moment(date).format('HH:mm')}
          </div>
          <div className={styles.calendarItem__location}>{location}</div>
        </div>
        <div className={styles.calendarItem__content}>
          <h3 className={styles.calendarItem__title}>{title}</h3>
          <div className={styles.calendarItem__description}>{description}</div>
        </div>
      </button>
      <div className={styles.calendarItem__delete}>
        <CloseButton onClick={onDeleteArticleClick(id)} />
      </div>
    </article>
  );
};

export default CalendarItem;
