import React from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import './DatePicker.scss';

const DatePicker = (props) => {
  return (
    <div className="date-picker">
      <DateTimePicker
        className={(props.notValidated.includes(2)) ? 'react-datetime-picker_invalid' : ''}
        value={props.value}
        onChange={props.onChange}
        id="date"
      />
      <label
        className="date-picker__label">
        Время
      </label>
    </div>
  )
}

export default DatePicker