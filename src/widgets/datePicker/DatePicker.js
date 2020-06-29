import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DateTimePicker from 'react-datepicker';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import styles from './DatePicker.scss';

const datePickerClasses = classNames.bind(styles);

const DatePicker = (
  {
    notValidated,
    value,
    onChange,
  },
) => {
  DatePicker.propTypes = {
    notValidated: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
  };
  return (
    <div className={styles.datePicker}>
      <DateTimePicker
        className={datePickerClasses({ datePicker_invalid: notValidated })}
        value={value}
        onChange={onChange}
        id="date"
        wrapperClassName="styles.datePicker__wrapperNewClassSAKJDsdfhasdjkfglakfa"
      />
      <span
        className={styles.datePicker__label}
        // htmlFor="date"
      >
        Время
      </span>
    </div>
  );
};

export default DatePicker;
