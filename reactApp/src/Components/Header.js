import React from "react";
import LogoIcon from "./LogoIcon";
import Buttons from "./Buttons";
import Subtitle from "./Subtitle";

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="header__container container">
          <LogoIcon/>
          <div className="header__subtitle">
            <Subtitle/>
          </div>
          <Buttons
            wrapper="header"
            types={[
                { mod: "submit", value: "Событие +", type: "button", id: "newArticleButton" },
                { mod: "refresh", value: "Обновить", type: "button", id: "refreshButton" }
              ]}
            onClick={this.props.onClick}
          />
        </div>
      </header>
    )
  }
}