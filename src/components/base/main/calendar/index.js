import React from "react";
import "./index.scss"
import CalendarItem from "./calendar-item";
import moment from "moment";


const Calendar = (props) => {
  const data = props.calendarData;
  let cachedDate = '';

  return (
    <div className="main-calendar">
      <div className="main-calendar__container">
        {
          (!data.articles.length) && (
            <div className="main-calendar_empty">
              <h1>No Articles found</h1>
              <h3>Try to create a new one by clicking the button above</h3>
            </div>
          )
        }
        {
          data.articles.sort((a, b) => {
            if (a.date > b.date) return -1;
            return 1
          }).map(item => {
            const currentDate = moment(item.date, "YYYY-MM-DD hh:mm", 'ru').format("D MMMM");
            cachedDate = currentDate;
            if (cachedDate === currentDate) {
              return (
                <React.Fragment key={currentDate}>
                  <div className="main-calendar__date">
                    <h3>{currentDate}</h3>
                  </div>
                  <CalendarItem
                    {...item}
                    key={item.id}
                    onDeleteArticleClick={props.calendarData.onDeleteArticleClick}
                  />
                </React.Fragment>
              )
            }
            return (
              <CalendarItem
                {...item}
                key={item.id}
                onDeleteArticleClick={props.calendarData.onDeleteArticleClick}
              />
            )
          })
        }
      </div>
    </div>
  )
};

export default Calendar


/*
{
  Object.keys(data.articles).sort((a, b) => {
    if (a > b) return -1;
    return 1;
  }).map(date => {
    return (
      <div
        className="main-calendar__item"
        key={date}
      >
        <div className="main-calendar__item_date">
          <h3>{date}</h3>
        </div>
        <div className="main-calendar__item_articles">
          {
            (data.articles[date].map(calendar-item => {
                return (
                  <calendar-item
                    className={(calendar-item.isImportant ? "article_important " : "") + " calendar-item"}
                    key={calendar-item.id}
                  >
                    <div
                      className="article__wrapper"
                      onClick={() => data.onArticleClick(date, calendar-item.id)}
                    >
                      <div className="article__info">
                        <div className="article__time">{calendar-item.time}</div>
                        <div className="article__location">{calendar-item.location}</div>
                      </div>
                      <div className="article__content">
                        <h3 className="article__title">{calendar-item.title}</h3>
                        <div className="article__description">{calendar-item.description}</div>
                      </div>
                    </div>
                    <div className="article__delete">
                      <CloseButton onClick={data.onDeleteArticleClick(date, calendar-item.id)}/>
                    </div>
                  </calendar-item>
                )
              }).sort((a, b) => {
                if (a.key > b.key) return -1;
                return 1;
              })
            )
          }
        </div>
      </div>
    )
  })
}*/
