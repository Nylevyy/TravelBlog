import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import CloseButton from '~/components/ui/close-button/CloseButton';
import styles from './CalendarItem.scss';

const calendarItemClasses = classNames.bind(styles);

const CalendarItem = ({
  title,
  location,
  date,
  description,
  isImportant,
  id,
  onArticleClick,
  onDeleteClick,
}) => {
  CalendarItem.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isImportant: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onArticleClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
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
          onArticleClick({
            data: { title, location, date, description, isImportant, id },
            modalType: 'articleEditor',
          });
        }}
        aria-label="article-edit"
      >
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
        <CloseButton onClick={onDeleteClick(id)} />
      </div>
    </article>
  );
};

export default CalendarItem;
