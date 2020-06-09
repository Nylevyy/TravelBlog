import React from "react";
import Header from "./Header";
import Modal from "./Modal";
import Main from "./Main";
import Footer from "./Footer";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articles: this.refreshArticles(),
      isModal: false
    }
  }
  refreshArticles() {
    let keys = Object.keys(localStorage);
    let articles = [];
    for(let key of keys) {
      articles.push(localStorage.getItem(key))
    }
    return articles
  }
  toggleModal() {
    const isModal = this.state.isModal;
    this.setState({isModal: (!isModal)})
  }
  removeArticle(id) {
    localStorage.removeItem(id);
    this.setState({articles: this.refreshArticles()})
  }
  handleClick(id) {

    switch (id) {
      case "newArticleButton":
        this.toggleModal();
        break;
      case "refreshButton":
        this.setState({articles: this.constructor.articles()});
        break;
      case "submitButton":
        break;
      case "resetButton":
        break;
      case "closeModal":
        this.toggleModal();
        break;
      default:
        this.removeArticle(id)
    }


  }

  render() {
    return (
      <div className="App">
        <Header onClick={this.handleClick.bind(this)}/>
        <Main onClick={this.handleClick.bind(this)}
              articles={this.state.articles}
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