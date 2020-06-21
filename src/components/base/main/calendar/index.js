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
          (data.dataStatus === "fetching") && (
            <div className="main-calendar_empty">
              {/*fetching-indicator*/}
              <div id="fountainG">
                <div id="fountainG_1" className="fountainG"/>
                <div id="fountainG_2" className="fountainG"/>
                <div id="fountainG_3" className="fountainG"/>
                <div id="fountainG_4" className="fountainG"/>
                <div id="fountainG_5" className="fountainG"/>
                <div id="fountainG_6" className="fountainG"/>
                <div id="fountainG_7" className="fountainG"/>
                <div id="fountainG_8" className="fountainG"/>
              </div>
            </div>
          )
        }
        {
          (data.dataStatus === "failed to fetch") && (
            <div className="main-calendar_empty">
              <h3>Ошибка соединения с сервером</h3>
              <h3>Пожалуйста, повторите попытку</h3>
            </div>
          )
        }
        {
          (!data.articles.length) && (data.dataStatus === "loaded") && (
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
            const currentDate = moment(item.date).format("D MMMM");
            if (!(cachedDate === currentDate)) {
              cachedDate = currentDate;
              return (
                <React.Fragment key={currentDate}>
                  <div className="main-calendar__date">
                    <h3>{currentDate}</h3>
                  </div>
                  <CalendarItem
                    {...item}
                    key={item.id}
                    onDeleteArticleClick={props.calendarData.onDeleteArticleClick}
                    onArticleClick={props.calendarData.onArticleClick}
                    hasRequestError={(props.calendarData.requestError) === item.id}
                  />
                </React.Fragment>
              )
            }
            return (
              <CalendarItem
                {...item}
                key={item.id}
                onDeleteArticleClick={props.calendarData.onDeleteArticleClick}
                onArticleClick={props.calendarData.onArticleClick}
                hasRequestError={(props.calendarData.requestError) === item.id}
              />
            )
          })
        }
      </div>
    </div>
  )
};

export default Calendar

