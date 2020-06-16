import React, {useState, useEffect} from "react";
import "./index.scss"



function Calendar() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const storage = localStorage.getItem("articles");
    if (!storage) {
      localStorage.setItem("articles", "{}");
      const data = {};
      setData(data);
      return
    }
    const data = JSON.parse(storage);
    setData(data);
  }, []);
  const handleRemove = (date, id) => {
    const filteredArticles = data[date].slice()
                              .filter(item => {
                                return (!item.id === id)
                              });
    const newData = Object.assign({}, data, { [date]: filteredArticles });
    if (!newData[date].length) {
      delete newData[date];
    }
    localStorage.setItem("articles", JSON.stringify(newData));
    setData(newData)
  };
  return (
    <div className="calendar">
      <div className="calendar__container">
        {
          (!Object.keys(data).length) && (
          <div className="calendar_empty">
          <h1>No Articles found</h1>
          <h3>Try to create a new one by clicking the button above</h3>
          </div>
          )
        }
        {
          Object.keys(data).map(date => {
            return (
              <div className="calendar__item"
                   key={date}
              >
                <div className="calendar__item_date">
                  <h3>{date}</h3>
                </div>
                <div className="calendar__item_articles">
                  {
                    (data[date].map(article => {
                        return (
                          <article className={(article.isImportant ? "article_important " : "") + " article"}
                                   key={article.id}>
                            <div className="article__info">
                              <div className="article__time">{article.time}</div>
                              <div className="article__location">{article.location}</div>
                            </div>
                            <div className="article__content">
                              <h3 className="article__title">{article.title}</h3>
                              <div className="article__description">{article.content}</div>
                            </div>
                            <div className="article__delete">
                              <button className="article__delete_button"
                                      onClick={() => handleRemove(date, article.id)}
                              >
                              </button>
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
              /*<Daily date={date}
                     onClick={props.onClick}
                     articles={articles}
                     key={date}
              />*/
            )
          })
        }
      </div>
    </div>
  )
}

export default Calendar 