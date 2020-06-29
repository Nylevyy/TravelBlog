import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const inputClasses = classNames.bind(styles);

const Input = ({
  name,
  notValidated,
  onChange,
  index,
  label,
  onInput,
  value,
}) => {
  Input.propTypes = {
    name: PropTypes.string,
    notValidated: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  };
  const wrapperClassName = `input_${name}`;
  const inputFieldClassName = `input__field_${name}`;
  return (
    <div className={classNames(styles.input, styles[wrapperClassName])}>
      <input
        className={inputClasses(
          styles.input__field,
          styles[inputFieldClassName],
          {
            input_invalid: notValidated,
          }
        )}
        type="text"
        id={name}
        onInput={(e) => onInput(index, e.target.value)}
        onChange={(e) => onChange(index, e.target.value)}
        value={value}
      />
      <label htmlFor={name} className={styles.input__label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
