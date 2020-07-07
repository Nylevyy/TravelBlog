import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.scss';

const buttonClasses = classNames.bind(styles);

const Button = ({ onClick, className, value, isSmall }) => {
  const handleClick = (button) => {
    button.blur();
    onClick();
  };
  return (
    <div
      className={buttonClasses('button__wrapper', {
        button__wrapper_small: isSmall,
      })}
    >
      <button
        className={buttonClasses([className], 'button')}
        type="button"
        onClick={(e) => handleClick(e.target.closest('button'))}
      >
        <span className={styles.button__name}>{value}</span>
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  isSmall: PropTypes.bool,
};

export default Button;
