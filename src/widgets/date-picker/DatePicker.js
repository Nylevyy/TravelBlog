import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import classNames from 'classnames/bind';
import 'react-datepicker/dist/react-datepicker.css';
import * as styles from './DatePicker.scss';

registerLocale('ru', ru);

const ccn = classNames.bind(styles);

function DatePicker({ notValidated, value, onChange }) {
  return (
    <div className={styles.datePicker}>
      <DateTimePicker
        className={ccn('datePicker__input', {
          datePicker_invalid: notValidated,
        })}
        calendarClassName={styles.datePicker__calendar}
        onChange={(date) => onChange({ index: 2, value: date })}
        onSelect={(date) => onChange({ index: 2, value: date })}
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
}

DatePicker.propTypes = {
  notValidated: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default DatePicker;
