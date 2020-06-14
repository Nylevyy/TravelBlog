import React from "react";
import Button from "../../ui/buttons";
import "./index.scss"

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1 className="header__logo_text">Календарь</h1>
        </div>
        <div className="header__subtitle">
          <h2 className="header__subtitle_text">
            Друзья, мои походы пока ещё не закончились, делюсь с вами!
          </h2>
        </div>
        <div className="header__buttons buttons">
          <Button
            onClick={props.onClick}
            value="Событие +"
            key="newEvent"
            type="button"
            mod="_submit"
            id="newEvent"
          />
          <Button
            onClick={props.onClick}
            value="Обновить"
            key="refresh"
            type="button"
            mod="_refresh"
            id="refresh"
          />
        </div>
      </div>
    </header>
  )
}

export default Header


/*
<Buttons
  wrapper="header"
  types={[
    { mod: "submit", value: "Событие +", type: "button", id: "newArticleButton" },
    { mod: "refresh", value: "Обновить", type: "button", id: "refreshButton" }
  ]}
  onClick={this.props.onClick}
/>*/
