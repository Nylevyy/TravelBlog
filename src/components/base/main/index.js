import React, {useState} from "react";
import Header from "../../core/header";
import Footer from "../../core/footer";
import Calendar from "./calendar";
import Modal from "../../core/modal";

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id) => {
    switch (id) {
      case "newEvent":
        handleModal(true);
        break;
      case "refresh":
        window.location.reload();
        break;
      case "submitForm":
        handleModal(false);
        break;
      case "modalClose":
        handleModal(false);
        break;
    }
  };

  const handleModal = (boolean) => {
    setIsOpen(boolean)
  };

  return (
    <div>
      <Header onClick={handleClick}/>
      <Calendar onClick={handleClick}/>
      <Footer/>
      <Modal onClick={handleClick}
             isOpen={isOpen}
      />
    </div>
  )
}


export default Main

