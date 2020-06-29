import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.scss';

const buttonClasses = classNames.bind(styles);

const Button = (
  {
    onClick,
    mod,
    value,
    isSmall,
  },
) => {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    mod: PropTypes.string,
    value: PropTypes.string,
    isSmall: PropTypes.bool,
  };
  const handleClick = (button) => {
    button.blur();
    onClick();
  };
  return (
    <div className={styles.button__wrapper}>
      <button
        className={`${styles.button} ${styles[`button${mod}`]} ${buttonClasses({ button_small: isSmall })}`}
        type="button"
        onClick={(e) => handleClick(e.target.closest('button'))}
      >
        <span className={styles.button__name}>{value}</span>
      </button>
    </div>
  );
};

export default Button;
