import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import * as styles from './button.scss';

const ccn = classNames.bind(styles);

const Button = ({ onClick, className, label, type, size = 'default' }) => {
  const handleClick = (button) => {
    button.blur();
    onClick();
  };
  return (
    <div
      className={ccn(
        'ui-button',
        className,
        `uiButton_${type}`,
        `uiButton_${size}`,
      )}
    >
      <button
        className={styles.uiButton__button}
        type="button"
        onClick={(e) => handleClick(e.target.closest('button'))}
      >
        <span className={styles.uiButton__label}>{label}</span>
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
