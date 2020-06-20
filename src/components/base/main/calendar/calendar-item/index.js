import React from "react";
import CloseButton from "../../../../ui/close-button";
import './index.scss';
import moment from "moment";


const CalendarItem = (props) => {
  return (
    <article
      className={(props.isImportant ? "calendar-item_important " : "") + " calendar-item"}
      key={props.id}
    >
      <div
        className="calendar-item__wrapper"
        onClick={() => props.onArticleClick(props.id)}
      >
        <div className="calendar-item__info">
          <div className="calendar-item__time">
            {moment(props.date ,"YYYY-MM-DD hh:mm", 'fr').format("HH:MM")}
          </div>
          <div className="calendar-item__location">{props.location}</div>
        </div>
        <div className="calendar-item__content">
          <h3 className="calendar-item__title">{props.title}</h3>
          <div className="calendar-item__description">{props.description}</div>
        </div>
      </div>
      <div className="calendar-item__delete">
        <CloseButton onClick={props.onDeleteArticleClick(props.id)}/>
      </div>
    </article>
  )
};

export default CalendarItem