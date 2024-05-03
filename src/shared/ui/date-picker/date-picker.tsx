import classNames from 'classnames/bind';
import DateTimePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import * as styles from './date-picker.scss';

registerLocale('ru', ru);

const ccn = classNames.bind(styles);

type Props = {
  notValidated: boolean;
  value: Date;
  onChange: (value: Date) => void;
  id?: string;
};

const DatePicker = ({ notValidated, value, onChange, id = 'date' }: Props) => {
  return (
    <div className={styles.datePicker}>
      <DateTimePicker
        className={ccn('input', {
          invalid: notValidated,
        })}
        calendarClassName={styles.calendar}
        onChange={onChange}
        onSelect={onChange}
        selected={value}
        id={id}
        showTimeInput
        locale="ru"
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="d MMMM, yyyy HH:mm"
        popperClassName={styles.popper}
      />
      <label className={styles.label} htmlFor={id}>
        Время
      </label>
    </div>
  );
};

export default DatePicker;
