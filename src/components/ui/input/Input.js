import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const inputClasses = classNames.bind(styles);

const Input = (
  {
    name, notValidated, onChange, index, label, onInput, value,
  },
) => {
  Input.propTypes = {
    name: PropTypes.string,
    notValidated: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  };
  return (
    <div className={`${styles.input} ${styles[`input_${name}`]}`}>
      <input
        className={`${styles.input__field} ${styles[`input__field_${name}`]} ${inputClasses({ input_invalid: notValidated })}`}
        type="text"
        id={`input_${name}`}
        onInput={(e) => onInput(index, e.target.value)}
        onChange={(e) => onChange(index, e.target.value)}
        value={value}
      />
      <label
        htmlFor={`input_${name}`}
        className={styles.input__label}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
