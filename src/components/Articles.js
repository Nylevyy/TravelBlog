import React from "react";
import Buttons from "./Buttons";

export default class Articles extends React.Component {
  render() {
    const articles = JSON.parse(this.props.articles);

     return (
       <div className="daily__articles articles">
         {
           (articles.map(article => {
            return (
              <article className={(article.isImportant ? "article_important " : "") + "articles__article article" }
                       key={article.time}>
                <div className="article__wrapper article__wrapper_info">
                  <div className="article__time time">{article.time}</div>
                  <div className="article__location location">{article.location}</div>
                </div>
                <div className="article__wrapper article__wrapper_content">
                  <h3 className="article__title title">{article.title}</h3>
                  <div className="article__content content">{article.content}</div>
                </div>
                <Buttons
                  wrapper="article"
                  types={[
                    { mod: "delete", value: "", type: "button", id: article.id, lSKey: this.props.date }
                  ]}
                  onClick={this.props.onClick}
                />
              </article>
            )
         }).sort((a, b) => {
              if (a.key > b.key)  return -1;
              return 1;
             })
           )
         }
       </div>
     )
  }
}