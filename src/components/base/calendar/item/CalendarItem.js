import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import CloseButton from '~/components/ui/close-button/CloseButton';
import * as styles from './CalendarItem.scss';

const ccn = classNames.bind(styles);

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
  return (
    <article
      className={ccn({
        calendarItem: true,
        calendarItem_important: isImportant,
      })}
    >
      <button
        className={styles.calendarItem__button}
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
            <span>{moment(date).format('HH:mm')}</span>
          </div>
          <div className={styles.calendarItem__location}>
            <span
              className={ccn(
                'calendarItem__text',
                'calendarItem__locationText',
              )}
            >
              {location}
            </span>
          </div>
        </div>
        <div className={styles.calendarItem__content}>
          <h3 className={ccn('calendarItem__text', 'calendarItem__title')}>
            {title}
          </h3>
          <span
            className={ccn('calendarItem__text', 'calendarItem__description')}
          >
            {description}
          </span>
        </div>
      </button>
      <div className={styles.calendarItem__delete}>
        <CloseButton onClick={onDeleteClick(id)} />
      </div>
    </article>
  );
};

CalendarItem.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isImportant: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onArticleClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CalendarItem;
