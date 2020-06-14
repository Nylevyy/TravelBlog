import React from "react";
import "./index.scss"


function Daily(props) {
  const articles = props.articles;




  return (
    <div className="daily">
      <div className="daily__date">
        <h3>{props.date}</h3>
      </div>
      <div className="daily__articles">
        {
          (articles.map(article => {
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
                            onClick={() => props.onClick(article.id, props.date)}
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
  )
}

export default Daily


/*
Articles onClick={props.onClick}
articles={props.articles}
date={props.value}
/>
*/
