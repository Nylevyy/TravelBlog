import classNames from 'classnames/bind';
import DateTimePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import * as styles from './date-picker.module.css';

registerLocale('ru', ru);

const ccn = classNames.bind(styles);

type Props = {
  notValidated: boolean;
  value: Date;
  onChange: (value: Date | null) => void;
  id?: string;
};

const DatePicker = ({ notValidated, value, onChange, id = 'date' }: Props) => {
  return (
    <div className={styles.datePicker}>
      <DateTimePicker
        calendarClassName={styles.calendar}
        dateFormat="d MMMM, yyyy HH:mm"
        id={id}
        locale="ru"
        popperClassName={styles.popper}
        selected={value}
        showTimeInput
        timeCaption="time"
        timeFormat="HH:mm"
        className={ccn('input', {
          invalid: notValidated,
        })}
        onChange={onChange}
        onSelect={onChange}
      />
      <label className={styles.label} htmlFor={id}>
        Время
      </label>
    </div>
  );
};

export default DatePicker;
