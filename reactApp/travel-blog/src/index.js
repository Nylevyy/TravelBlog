import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import logo from "./static/img/header/logo.png"
import popup from "./static/img/modal/popup.svg"

function LogoIcon() {
  return (
    <div className="header__logo">
      <img src={logo} alt="logo"/>
    </div>
  )
}
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const mod = this.props.modification;
    return (
      <button
        className={"buttons__button button buttons__button_" + mod}
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
  render() { //todo: _modal modify
    const wrapper = this.props.wrapper;
      return (
        <div className={wrapper + "__buttons buttons"}>
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
class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="header">
        <div className="header__container container">
          <LogoIcon/>
          <div className="header__subtitle">
            <h2 className="subtitle">
              Друзья, мои походы пока ещё не закончились, делюсь с вами!
            </h2>
          </div>
          <Buttons wrapper="header"/>
        </div>
      </header>
    )
  }
}

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const articles = this.props.article.map(articleTime => {
      return (
        <article className="daily__article article" key={articleTime}>
          <div className="article__wrap">
            <div className="article__time time">{articleTime}</div>
            <div className="article__location location">Румыния, Район берегов Лос-Сантос</div>
          </div>
          <div className="article__wrapper">
            <h3 className="article__title title">Мы очень круто отдохнули с Марусей!</h3>
            <div className="article__content content">Моя мама очень трудолюбивая и успешная женщина.
              Однажды она призналась мне, что считает лень — болезнью.
              Поэтому, когда человек ленится, его надо оставить в покое
              заварить чай с малиной.
              Сейчас она болеет ленью. Это так мило!
            </div>
          </div>
          <div className="article__button">
            <Button
              value=""
              modification="delete"
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
        </div>
        <Articles article={["12:30", "17:30", "19:54"]}/>
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

function Footer() {
  return (
    <footer className="footer"/>
  )
}

function Input(props) {
  const name = props.name;
  const type = (name === "time") ? "time" : "text";
  return (
    <input type={type} className={name + " input__field input__" + name} id={"input__" + name}/>
  );
}

function TextArea() {
  return (
    <textarea className="input__content content" name="content" cols="30" rows="10" placeholder="Описание"/>
  )
}

function Label(props) {
  return (
    <label htmlFor={"input__" + props.name} className="input__label">{props.value}</label>
  );
}

function LocationLabel () {
  return (
    <div className="input__wrapper_location">
      <Label name="location" value="Место"/>
      <div className="input__wrapper_location">
        <button className="input__find-location"/>
        <div className="input__popup input__popup_active">
          <img src={popup} alt="popup"/>
        </div>
      </div>
    </div>
  )
}

function Checkbox() {
  return (

   <div className="form__wrapper">
     <input type="checkbox" className="form__checkbox" id="form__checkbox"/>
     <label htmlFor="form__checkbox" className="form__checkbox_label">Пометить событие как важное</label>
   </div>
  )
}

class InputWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const name = this.props.name;
    const label = this.props.value;
    const isLoc = (name === "location");

    if (isLoc) return (
      <div className={"form__input input form__input_" + name}>
        <Input name={name}/>
        <LocationLabel/>
      </div>
      );

    return (
      <div className={"form__input input form__input_" + name}>
        <Input name={name}/>
        <Label name={name} value={label}/>
      </div>
    )
  }
}

class Form extends React.Component {
  render() {
    return (
      <form action="" className="modal__form form">
        <InputWrapper name="title" value="Событие"/>
        <div className="form__wrapper">
          <InputWrapper name="location" value="Место"/>
          <InputWrapper name="time" value="Время"/>
        </div>
        <div className="form__input form__input_content input">
          <TextArea/>
        </div>
        <div className="form__input form__wrapper">
          <Checkbox/>
          <Buttons wrapper="form"/>
        </div>
      </form>
    )
  }
}

class Modal extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="wrapper__modal">
          <div className="modal">
            <div className="modal__container container">
              <div className="modal__button">
                <Button modification="delete"/>
              </div>
              <div className="modal__content">
                <Form/>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
ReactDOM.render(
  <div className="App">
    <Header/>
    <Main />
    <Footer/>
    <Modal/>
  </div>
   ,
  document.getElementById('root')
);
