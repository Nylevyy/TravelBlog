import React from 'react';
import moment from 'moment';
import CloseButton from '../../../ui/closeButton/CloseButton';
import './CalendarItem.scss';

const CalendarItem = (props) => {
  return (
    <article
      className={(props.isImportant ? 'calendar-item_important ' : '') + 'item'}
      key={props.id}
    >
      <div
        className='calendar-item__wrapper'
        onClick={() => props.onArticleClick(props.id)}
      >
        {
          (props.hasRequestError) && (
            <div className='calendar-item__error-log'>
              <span className='calendar-item__error-span'>
                Ошибка при выполнении запроса на сервер
              </span>
            </div>
          )
        }
        <div className='calendar-item__info'>
          <div className='calendar-item__time'>
            {moment(props.date).format('HH:mm')}
          </div>
          <div className='calendar-item__location'>{props.location}</div>
        </div>
        <div className='calendar-item__content'>
          <h3 className='calendar-item__title'>{props.title}</h3>
          <div className='calendar-item__description'>{props.description}</div>
        </div>
      </div>
      <div className='calendar-item__delete'>
        <CloseButton onClick={props.onDeleteArticleClick({id})}/>
      </div>
    </article>
  )
};

export default CalendarItem;
