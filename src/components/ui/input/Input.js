import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const inputClasses = classNames.bind(styles);

const Input = (
  {
    className, notValidated, onChange, index, label, onInput, value,
  },
) => {
  Input.propTypes = {
    className: PropTypes.string,
    notValidated: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  };
  return (
    <div className={classNames('input', className)}>
      <input
        className={inputClasses('input__field', className, {
          input_invalid: notValidated,
        })}
        type="text"
        id={className}
        onInput={(e) => onInput(index, e.target.value)}
        onChange={(e) => onChange(index, e.target.value)}
        value={value}
      />
      <label
        htmlFor={className}
        className={styles.input__label}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
