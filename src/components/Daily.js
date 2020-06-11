import React  from "react";
import Articles from "./Articles";

export default class Daily extends React.Component {


  render() {
    return (
      <div className="main__daily daily">
        <div className="daily__date">
          <h3>{this.props.value}</h3>
        </div>
        <Articles onClick={this.props.onClick}
                  articles={this.props.articles}
                  date={this.props.value}
        />
      </div>
    )
  }
}