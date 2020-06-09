import popup from "../static/img/modal/popup.svg";
import React from "react";
import Label from "./Label";

export default function LocationLabel () {
  return (
    <div className="input__wrapper_location">
      <Label name="location" value="Место"/>
      <div className="buttons">
        <button className="buttons__button button__find-location"/>
        <div className="buttons__popup buttons__popup_active">
          <img src={popup} alt="popup"/>
        </div>
      </div>
    </div>
  )
}