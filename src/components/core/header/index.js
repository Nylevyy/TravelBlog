import React from "react";
import Button from "../../Button";

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          Календарь
        </div>
        <div className="header__subtitle">
          <h2 className="subtitle">
            Друзья, мои походы пока ещё не закончились, делюсь с вами!
          </h2>
        </div>
        <div className={wrapper + "__buttons buttons"}>
          {props.types.map((type) => {
            return (
              <Button
                onClick={props.onClick}
                value={type.value}
                modification={type.mod}
                type={type.type}
                key={type.id}
                id={type.id}
                lSKey={type.lSKey}
              />
            )
          })}
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
