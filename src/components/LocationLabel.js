import popup from "../assets/img/modal/popup.svg";
import React from "react";
import Label from "./Label";

export default function LocationLabel (props) {
  const className = (props.popUp) ? " buttons__popup_active" : "";
  return (
    <div className="input__wrapper_location"
         onClick={() => props.onClick("popUp")}
    >
      <Label name="location" value="Место"/>
      <div className="buttons">
        <button className="buttons__button button__find-location"
                onClick={(e) => props.onClick("getLocation", e)}
        />
        <div className={"buttons__popup" + className}>
          <img src={popup} alt="popup"/>
        </div>
      </div>
    </div>
  )
}