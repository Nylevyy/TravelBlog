import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.scss';

const Checkbox = ({ onChange, checked, id, label, index }) => (
  <div className={styles.checkbox}>
    <label htmlFor="form__checkbox" className={styles.checkbox__label}>
      <input
        type="checkbox"
        className={styles.checkbox__input}
        id={id}
        onChange={(e) => onChange({ index, value: e.target.checked })}
        checked={checked}
      />
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Checkbox;
