import { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './input-textarea.module.css';

const ccn = classNames.bind(styles);

type Props = {
  className?: string;
  isValid?: boolean;
  onChange?: (e: string) => void;
  label?: string;
  htmlProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const InputTextarea = ({ className, isValid, onChange, htmlProps }: Props) => {
  return (
    <textarea
      className={ccn('textarea', {
        invalid: !isValid,
        className,
      })}
      onChange={(e) => onChange?.(e.target.value)}
      {...htmlProps}
    />
  );
};

export default InputTextarea;
