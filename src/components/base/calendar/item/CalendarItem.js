import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import CloseButton from '../../../ui/closeButton/CloseButton';
import './CalendarItem.scss';

const CalendarItem = (
  {
    isImportant,
    id,
    onArticleClick,
    hasRequestError,
    title,
    location,
    date,
    description,
    onDeleteArticleClick,
  },
) => {
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
      className={`${(isImportant ? 'calendar-item_important' : '')} item`}
      key={id}
    >
      <button
        className="calendar-item__wrapper"
        onClick={() => onArticleClick(id)}
        type="button"
      >
        {
          (hasRequestError) && (
            <div className="calendar-item__error-log">
              <span className="calendar-item__error-span">
                Ошибка при выполнении запроса на сервер
              </span>
            </div>
          )
        }
        <div className="calendar-item__info">
          <div className="calendar-item__time">
            {moment(date).format('HH:mm')}
          </div>
          <div className="calendar-item__location">{location}</div>
        </div>
        <div className="calendar-item__content">
          <h3 className="calendar-item__title">{title}</h3>
          <div className="calendar-item__description">{description}</div>
        </div>
      </button>
      <div className="calendar-item__delete">
        <CloseButton onClick={onDeleteArticleClick(id)} />
      </div>
    </article>
  );
};

export default CalendarItem;
