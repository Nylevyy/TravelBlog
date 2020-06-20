import React from "react";
import './index.scss'


const CloseButton = (props) => {
  return (
    <div className="close">
      <button
        className="close__button"
        onClick={() => props.onClick()}
      >
      </button>
    </div>
  )
};

export default CloseButton

