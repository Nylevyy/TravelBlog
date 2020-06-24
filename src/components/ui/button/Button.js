import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (
  {
    onClick,
    mod,
    value,
  },
) => {
  Button.propTypes = {
    onClick: PropTypes.func,
    mod: PropTypes.string,
    value: PropTypes.string,
  };
  const handleClick = (button) => {
    button.blur();
    onClick();
  };
  return (
    <div className="button__wrapper">
      <button
        className={`button button ${mod}`}
        type="button"
        onClick={(e) => handleClick(e.target.closest('button'))}
      >
        <span className="button__name">{value}</span>
      </button>
    </div>
  );
};

export default Button;
