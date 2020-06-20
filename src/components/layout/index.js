import React from "react";
import Header from "../core/header";
import Footer from "../core/footer";
import Modal from "../core/modal";

const Layout = (props) => {
  return (
    <div className="layout">
      <Header headerData={props.layoutData.header}/>
      <div className="layout__content">
        {props.children}
      </div>
      <Footer/>
      <Modal modalData={props.layoutData.modal}/>
    </div>
  )
};

export default Layout