import React from "react";
import ReactDOM from "react-dom";
// import "./index.scss";
import App from "./components/App";
import Header from "./components/core/header";
import Footer from "./components/core/footer";
import "./assets/scss/base.scss"
import Modal from "./components/core/modal";

ReactDOM.render(
  // <App/>
  <div>
    <Header/>
    <Footer/>
    <Modal/>
  </div>


  ,
  document.getElementById('root')
);
