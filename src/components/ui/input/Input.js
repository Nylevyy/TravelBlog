import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const inputClasses = classNames.bind(styles);

const Input = ({ name, isValid, onChange, index, label, onInput, value }) => {
  const wrapperClassName = `input_${name}`;
  const inputFieldClassName = `input__field_${name}`;
  return (
    <div className={inputClasses('input', [wrapperClassName])}>
      <input
        className={inputClasses('input__field', [inputFieldClassName], {
          input_invalid: !isValid,
        })}
        type="text"
        id={name}
        onInput={(e) => onInput({ index, value: e.target.value })}
        onChange={(e) => onChange({ index, value: e.target.value })}
        value={value}
      />
      <label htmlFor={name} className={styles.input__label}>
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  isValid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  index: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
