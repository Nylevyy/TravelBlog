import React from "react";
import Buttons from "./Buttons";

export default class Articles extends React.Component {
  render() {
    const data = this.props.articles;
    if (!data.length) return (
      <div className="daily__articles articles">
        <h1>No Articles found</h1>
        <h3>Try to create a new one by clicking the button above</h3>
      </div>
    );
    const articles = data.map(article => {
      return JSON.parse(article)
    });

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
                    { mod: "delete", value: "", type: "button", id: article.id }
                  ]}
                  onClick={this.props.onClick}
                />
              </article>
            )
         }).sort((a, b) => {
               console.log(a.key, b.key, typeof a.key);
              if (a.key > b.key)  return -1;
              return 1;
             })
           )
         }
       </div>
     )
  }
}