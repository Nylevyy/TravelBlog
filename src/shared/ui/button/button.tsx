import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import { ButtonSize, ButtonType } from './types';
import * as styles from './button.scss';

const ccn = classNames.bind(styles);

type Props = {
  onClick?: () => void;
  className?: string;
  label?: string;
  type?: ButtonType;
  size?: ButtonSize;
  htmlType?: 'button' | 'submit' | 'reset';
  htmlProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

const Button = ({
  className,
  htmlProps,
  htmlType = 'button',
  label,
  onClick,
  size = 'default',
  type = 'submit',
}: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.target instanceof HTMLElement) {
      e.target.closest('button')?.blur();
    }

    onClick?.();
  };

  return (
    <div className={ccn('ui-button', className, type, size)}>
      <button
        // eslint-disable-next-line react/button-has-type
        type={htmlType}
        {...htmlProps}
        className={styles.button}
        onClick={handleClick}
      >
        <span className={styles.label}>{label}</span>
      </button>
    </div>
  );
};

export default Button;
