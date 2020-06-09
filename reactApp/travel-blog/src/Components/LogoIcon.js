import logo from "../static/img/header/logo.png";
import React from "react";

export default function LogoIcon() {
  return (
    <div className="header__logo">
      <img src={logo} alt="logo"/>
    </div>
  )
}