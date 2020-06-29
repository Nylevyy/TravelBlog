import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import classNames from 'classnames/bind';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.scss';

registerLocale('ru', ru);

const datePickerClasses = classNames.bind(styles);

const DatePicker = ({ notValidated, value, onChange }) => {
  DatePicker.propTypes = {
    notValidated: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
  };
  return (
    <div className={styles.datePicker}>
      <DateTimePicker
        className={datePickerClasses('datePicker__input', {
          datePicker_invalid: notValidated,
        })}
        calendarClassName={styles.datePicker__calendar}
        onChange={(date) => onChange(2, date)}
        onSelect={(date) => onChange(2, date)}
        selected={value}
        id="date"
        showTimeInput
        locale="ru"
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="d MMMM, yyyy HH:mm"
        popperClassName={styles.datePicker__popper}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.datePicker__label} htmlFor="date">
        Время
      </label>
    </div>
  );
};

export default DatePicker;
