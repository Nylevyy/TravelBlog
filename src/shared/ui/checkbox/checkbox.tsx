import { InputHTMLAttributes } from 'react';
import * as styles from './checkbox.scss';

type Props = {
  label?: string;
  onChange?: (value: boolean) => void;
  htmlProps?: InputHTMLAttributes<HTMLInputElement>;
};

const Checkbox = ({ onChange, label, htmlProps }: Props) => {
  return (
    <div className={styles.uiCheckbox}>
      <label className={styles.label}>
        <input
          type="checkbox"
          onChange={(e) => onChange?.(e.target.checked)}
          className={styles.input}
          {...htmlProps}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
