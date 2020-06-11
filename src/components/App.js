import React from "react";
import Index from "./core/header";
import Modal from "./core/Modal";
import Main from "./Main";
import Footer from "./core/Footer";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      days: this.getDays(),
      articles: this.getArticles(),
      isModal: false,
      inputs: [
        {
          name: "title",
          value: "",
          label: "Событие"
        },
        {
          name: "location",
          value: "",
          label: "Место"
        },
        {
          name: "time",
          value: "",
          label: "Время"
        },
        {
          name: "content",
          value: "",
          label: ""
        }, {
          name: "checkbox",
          value: "",
          label: "Пометить событие как важное"
        }
      ],
      popUp: true
    }
  }
  getDate(day, monthNum) {
    const months = [" января", " февраля", " марта", " апреля", " мая", " июня",
      " июля", " августа", " сентября", " октября", " ноября", " декабря"];
    const month = months[monthNum];
    return (day + month)
  }
  handleSubmit(e, inputs) {
    e.preventDefault();
    const input = inputs;
    const id = Date.now();
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const date = this.getDate(day, month);
    for (let i = 0; i < input.length - 1; i++) {
      if (!input[i].value) {
        alert("Поле " + input[i].name + " не заполнено");
        return
      }
    }
    const article = {
      title: input[0].value,
      location: input[1].value,
      time: input[2].value,
      content: input[3].value,
      isImportant: input[4].value,
      id: id
    };
    const storage = localStorage.getItem(date);
    if (!storage) {
      localStorage.setItem(date, JSON.stringify([article]));
    } else {
      const data = JSON.parse(storage);
      data.push(article);
      localStorage.setItem(date, JSON.stringify(data))
    }
    this.clearInputs();
    this.toggleModal();
    this.refreshPage()
  }
  handleReset() {
    this.clearInputs();
  }
  clearInputs() {
    const inputs = this.state.inputs.slice();
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    this.setState({inputs: inputs})
  }
  handleChange(key, e) {
    const target = e.target;
    const value = (target.id === "form__checkbox" ? target.checked : target.value);
    const newState = this.state.inputs.slice();
    newState[+key].value = value;
    this.setState({inputs: newState});
  }
  getDays() {
    let keys = Object.keys(localStorage);
    let days = [];
    for (let key of keys) {
      days.push(key)
    }
    return days
  }
  getArticles() {
    let keys = Object.keys(localStorage);
    let articles = [];
    for (let key of keys) {
      articles.concat(localStorage.getItem(key))
    }
    return articles
  }
  refreshPage() {
    this.setState({
      days: this.getDays(),
      articles: this.getArticles()
    })
  }
  toggleModal() {
    const isModal = this.state.isModal;
    this.setState({isModal: (!isModal)})
  }
  removeArticle(id, key) {
    const storage = JSON.parse(localStorage.getItem(key));
    const elem = storage.find(item => item.id === id);
    const elemIndex = storage.indexOf((elem), 0);
    storage.splice(elemIndex, 1);
    (storage.length === 0) ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(storage));
    this.refreshPage()
  }
  setLocation(geo) {
    const coords = geo.coords;
    const geolocation = { latitude: coords.latitude, longitude: coords.longitude };
    alert(JSON.stringify(geolocation));
  }
  handleLocationError(err) {
      alert(`ERROR(${err.code}): ${err.message}`);
  }
  getLocation(evt) {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition(this.setLocation, this.handleLocationError)
  }
  handleClick(id, value) {
    switch (id) {
      case "newArticleButton":
        this.toggleModal();
        break;
      case "refreshButton":
        this.refreshPage();
        break;
      case "submitButton":
        break;
      case "resetButton":
        this.clearInputs();
        break;
      case "closeModal":
        this.toggleModal();
        break;
      case "getLocation":
        this.getLocation(value);
        break;
      case "popUp":
        this.setState({popUp: false});
        break;
      default:
        this.removeArticle(id, value)
    }
  }
  render() {
    return (
      <div className="main">
        <Index onClick={this.handleClick}/>
        <Main onClick={this.handleClick}
              days={this.state.days}
        />
        <Footer/>
        <Modal
          isOpen={this.state.isModal}
          onClick={this.handleClick}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onReset={this.handleReset}
          inputs={this.state.inputs}
          popUp={this.state.popUp}
        />
      </div>
    )
  }
}