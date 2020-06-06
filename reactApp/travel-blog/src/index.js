import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

function LogoIcon() {
  return (
    <div className="header__logo">
      <img src="../src/img/header/logo.png" alt="logo"/>
    </div>
  )
}
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const count = +this.props.amount;
    const isOnly = (count === 1);
    const mod = this.props.modification;
    return (
      <button
        className={isOnly ? "button button_" + mod : "buttons__button button buttons__button_" + mod}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    )
  }
}
class Buttons extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header__buttons buttons"/*todo: this.props.className*/>
        <Button
          onClick={() => console.log('click')}
          value="Событие +"
          modification="submit"
        />
        <Button
          onClick={() => console.log('click')}
          value="Обновить"
          modification="refresh"
        />
      </div>
    )
  }
}
function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <LogoIcon/>
        <div className="header__subtitle">
          <h2 className="subtitle">
            Друзья, мои походы пока ещё не закончились, делюсь с вами!
          </h2>
        </div>
        <Buttons/>
      </div>
    </header>
  )
}

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const articles = this.props.article.map(articleTime => {
      return (
        <article className="daily__article article">
          <div className="article__wrap">
            <div className="article__time time">{articleTime}</div>
            <div className="article__location location">#location</div>
          </div>
          <div className="article__wrapper">
            <h3 className="article__title title">Title</h3>
            <div className="article__content content">content Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque expedita explicabo labore nobis nostrum omnis saepe sunt totam, ullam!</div>
          </div>
          <div className="article__button">
            <Button
              value="delete"
              amount="1"
            />
          </div>
        </article>
      )
    });
    return (
      <div className="daily__articles">
        {articles}
      </div>
    )
  }
}

class Daily extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container__daily daily">
        <div className="daily__date">
          <h3>{this.props.value}</h3>
          <Articles article={["12:30", "17:30", "19:54"]}/>
        </div>
      </div>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    }
  }
  render() {
    return (
      <main className="main">
        <div className="main__container container">
          <Daily value="07 Июня"/>
        </div>
      </main>
    )
  }
}

function ToDo() {
  return (
    <Header/>
  )
}

ReactDOM.render(
    <Main />
   ,
  document.getElementById('root')
);
