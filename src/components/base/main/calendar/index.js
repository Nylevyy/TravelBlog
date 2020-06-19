import React from "react";
import "./index.scss"
import CloseButton from "../../../ui/close-button";


function Calendar(props) {
  const data = props.calendarData;
  return (
    <div className="main-calendar">
      <div className="main-calendar__container">
        {
          (!Object.keys(data.articles).length) && (
            <div className="main-calendar_empty">
              <h1>No Articles found</h1>
              <h3>Try to create a new one by clicking the button above</h3>
            </div>
          )
        }
        {
          (
          let eventDate = '';
          data.articles.map(item => {
            const currentDate = moment(item.date ,"YYYY-MM-DD hh:mm");


          })
        }




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
                    (data.articles[date].map(article => {
                        return (
                          <article
                            className={(article.isImportant ? "article_important " : "") + " article"}
                            key={article.id}
                          >
                            <div
                              className="article__wrapper"
                              onClick={() => data.onArticleClick(date, article.id)}
                            >
                              <div className="article__info">
                                <div className="article__time">{article.time}</div>
                                <div className="article__location">{article.location}</div>
                              </div>
                              <div className="article__content">
                                <h3 className="article__title">{article.title}</h3>
                                <div className="article__description">{article.description}</div>
                              </div>
                            </div>
                            <div className="article__delete">
                              <CloseButton onClick={data.onDeleteArticleClick(date, article.id)}/>
                            </div>
                          </article>
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
        }
      </div>
    </div>
  )
}

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
            (data.articles[date].map(article => {
                return (
                  <article
                    className={(article.isImportant ? "article_important " : "") + " article"}
                    key={article.id}
                  >
                    <div
                      className="article__wrapper"
                      onClick={() => data.onArticleClick(date, article.id)}
                    >
                      <div className="article__info">
                        <div className="article__time">{article.time}</div>
                        <div className="article__location">{article.location}</div>
                      </div>
                      <div className="article__content">
                        <h3 className="article__title">{article.title}</h3>
                        <div className="article__description">{article.description}</div>
                      </div>
                    </div>
                    <div className="article__delete">
                      <CloseButton onClick={data.onDeleteArticleClick(date, article.id)}/>
                    </div>
                  </article>
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
