import { TextareaHTMLAttributes, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import InputTextarea from './input-textarea';

type Props = {
  className?: string;
  label?: string;
  name: string;
  htmlProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const InputTextareaFormField = ({
  className,
  label,
  name,
  htmlProps,
}: Props) => {
  const { register, getFieldState } = useFormContext();
  const combinedHtmlProps = useMemo(
    () => ({
      ...htmlProps,
      ...register(name),
    }),
    [register, name],
  );
  const isValid = getFieldState(name).invalid;

  return (
    <InputTextarea
      className={className}
      htmlProps={combinedHtmlProps}
      isValid={!isValid}
      label={label}
    />
  );
};

export default InputTextareaFormField;
