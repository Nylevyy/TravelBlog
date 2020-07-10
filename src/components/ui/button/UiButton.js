import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './UiButton.scss';

const ccn = classNames.bind(styles);

export const {
  uiButton_submit,
  uiButton_refresh,
  uiButton_reset,
  uiButton_small,
} = styles;

const UiButton = ({ onClick, className, label }) => {
  const handleClick = (button) => {
    button.blur();
    onClick();
  };
  return (
    <div className={ccn('ui-button', className)}>
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

UiButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default UiButton;
