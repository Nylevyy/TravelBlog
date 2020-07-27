import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './UiInput.scss';

const ccn = classNames.bind(styles);

export const { uiInput_title, uiInput_location } = styles;

const UiInput = ({
  className,
  isValid,
  onChange,
  index,
  label,
  onInput,
  value,
  type = 'text',
}) => {
  return (
    <div className={ccn('ui-input', [className])}>
      <input
        className={ccn('ui-input__field', {
          uiInput__field_invalid: !isValid,
        })}
        type={type}
        id={className}
        onInput={(e) => onInput({ index, value: e.target.value })}
        onChange={(e) => onChange({ index, value: e.target.value })}
        value={value}
      />
      <label htmlFor={className} className={styles.uiInput__label}>
        {label}
      </label>
    </div>
  );
};

UiInput.propTypes = {
  className: PropTypes.string,
  isValid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  index: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default UiInput;
