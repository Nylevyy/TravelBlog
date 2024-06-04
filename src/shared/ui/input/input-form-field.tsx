import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from './input';

type Props = {
  className?: string;
  label?: string;
  name: string;
  type: 'text' | 'password';
};

const InputFormField = ({ className, label, name, type }: Props) => {
  const { register, getFieldState } = useFormContext();
  const htmlProps = useMemo(
    () => ({
      ...register(name),
      type,
    }),
    [register, name],
  );
  const isValid = getFieldState(name).invalid;

  return (
    <Input
      className={className}
      htmlProps={htmlProps}
      isValid={!isValid}
      label={label}
    />
  );
};

export default InputFormField;
