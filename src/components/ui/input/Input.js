import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (
  {
    name, notValidated, onChange, index, label, onInput, value,
  },
) => {
  Input.propTypes = {
    name: PropTypes.string,
    notValidated: PropTypes.bool,
    onChange: PropTypes.func,
    onInput: PropTypes.func,
    index: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };
  return (
    <div className={`input input_${name}`}>
      <input
        className={`input__field input__field_${name} ${(notValidated.includes(index) ? 'input_invalid' : '')}`}
        type="text"
        id={`input_${name}`}
        onInput={(e) => onInput(index, e.target.value)}
        onChange={(e) => onChange(index, e.target.value)}
        value={value}
      />
      <label
        htmlFor={`input_${name}`}
        className="input__label"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
