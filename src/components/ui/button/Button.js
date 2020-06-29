import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.scss';

const Button = (
  {
    onClick,
    className,
    value,
    isSmall,
  },
) => {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
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
        className={classNames(styles[className], styles.button, {
          [styles.button_small]: isSmall,
        })}
        type="button"
        onClick={(e) => handleClick(e.target.closest('button'))}
      >
        <span className={styles.button__name}>{value}</span>
      </button>
    </div>
  );
};

export default Button;
