import { InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './input.module.css';

const ccn = classNames.bind(styles);

type Props = {
  className?: string;
  isValid?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  htmlProps?: InputHTMLAttributes<HTMLInputElement>;
};

const Input = ({ className, isValid, onChange, label, htmlProps }: Props) => {
  return (
    <div className={ccn('ui-input', [className])}>
      <input
        className={ccn('field', { invalid: !isValid })}
        onChange={(e) => onChange?.(e.target.value)}
        {...htmlProps}
      />
      <label className={styles.label} htmlFor={className}>
        {label}
      </label>
    </div>
  );
};

export default Input;
