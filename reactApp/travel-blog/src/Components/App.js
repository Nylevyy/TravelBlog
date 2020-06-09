import React from "react";
import Header from "./Header";
import Modal from "./Modal";
import Main from "./Main";
import Footer from "./Footer";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      days: this.refreshDays(),
      articles: this.refreshArticles(),
      isModal: false
    }
  }
  refreshDays() {
    let keys = Object.keys(localStorage);
    let days = [];
    for (let key of keys) {
      days.push(key)
    }
    return days
  }
  refreshArticles() {
    let keys = Object.keys(localStorage);
    let articles = [];
    for (let key of keys) {
      articles.concat(localStorage.getItem(key))
    }
    return articles
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
    this.setState({days: this.refreshDays(), articles: this.refreshArticles()})
  }
  handleClick(id, key) {

    switch (id) {
      case "newArticleButton":
        this.toggleModal();
        break;
      case "refreshButton":
        this.refreshDays();
        this.refreshArticles();
        break;
      case "submitButton":
        this.refreshDays();
        this.refreshArticles();
        console.log('ok');
        break;
      case "resetButton":
        break;
      case "closeModal":
        this.toggleModal();
        break;
      default:
        this.removeArticle(id, key)
    }
  }

  render() {
    return (
      <div className="App">
        <Header onClick={this.handleClick.bind(this)}/>
        <Main onClick={this.handleClick.bind(this)}
              days={this.state.days}
        />
        <Footer/>
        <Modal
          isOpen={this.state.isModal}
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}