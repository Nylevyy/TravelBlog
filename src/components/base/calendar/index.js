import React, {useState} from "react";
import Daily from "./daily";
import "./index.scss"

function Calendar(props) {
  const data = Object.keys(localStorage).sort((a, b) => {
    console.log(b);
    return (Number.parseFloat(b) - Number.parseFloat(a));
  });



  return (
    <div className="calendar">
      <div className="calendar__container">
        {
          (data.length === 0) && (
          <div className="calendar_empty">
          <h1>No Articles found</h1>
          <h3>Try to create a new one by clicking the button above</h3>
          </div>
          )
        }
        {
          data.map(date => {
            const articles = JSON.parse(localStorage.getItem(date));
            return (
              <Daily date={date}
                     onClick={props.onClick}
                     articles={articles}
                     key={date}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Calendar 