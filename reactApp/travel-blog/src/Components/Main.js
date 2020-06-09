import React from "react";
import Daily from "./Daily";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

  }
  getDate(day, monthNum) {
    const months = [" января", " февраля", " марта", " апреля", " мая", " июня",
      " июля", " августа", " сентября", " октября", " ноября", " декабря"];
    const month = months[monthNum];
    return (day + month)
  }
  render() {
    const date = new Date();
    const month = date.getMonth().toLocaleString();
    const day = date.getDate().toLocaleString();

    return (
      <main className="main">
        <div className="main__container container">
          <Daily value={this.getDate(day, month)}
                 onClick={this.props.onClick}
                 articles={this.props.articles}
          />
        </div>
      </main>
    )
  }
}