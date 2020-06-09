import React from "react";
import Daily from "./Daily";

export default class Main extends React.Component {
  render() {
    const data = this.props.days;

    return (
      <main className="main">
        <div className="main__container container">
          {
            (data.length === 0) && (
              <div className="main__daily daily daily_empty">
                <h1>No Articles found</h1>
                <h3>Try to create a new one by clicking the button above</h3>
              </div>
            )
          }

          {
            data.map(item => {
              const articles = localStorage.getItem(item);
              return (
                <Daily value={item}
                     onClick={this.props.onClick}
                     articles={articles}
                     key={item}
                />
              )
            })
          }
        </div>
      </main>
    )
  }
}