import React from 'react';
import PropTypes from 'prop-types';
import './CloseButton.scss';

const CloseButton = ({ onClick }) => {
  CloseButton.propTypes = {
    onClick: PropTypes.func,
  };
  return (
    <div className="close">
      <button
        className="close__button"
        onClick={() => onClick()}
        type="button"
      >
        power
      </button>
    </div>
  );
};

export default CloseButton;
