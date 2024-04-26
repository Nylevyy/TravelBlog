import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './checkbox.scss';

const Checkbox = ({ onChange, checked, id, label, index }) => {
  return (
    <div className={styles.uiCheckbox}>
      <label htmlFor={id} className={styles.uiCheckbox__label}>
        <input
          type="checkbox"
          className={styles.uiCheckbox__input}
          id={id}
          onChange={(e) => onChange({ index, value: e.target.checked })}
          checked={checked}
        />
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Checkbox;
