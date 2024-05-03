import { Control, Controller } from 'react-hook-form';
import DatePicker from './date-picker';

type Props = {
  control: Control;
  id?: string;
  name: string;
};

const DatePickerFormField = ({ control, name, id }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DatePicker {...field} notValidated={fieldState.invalid} id={id} />
      )}
    />
  );
};

export default DatePickerFormField;
