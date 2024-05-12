import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from './input';

type Props = {
  label?: string;
  name: string;
  type: 'text' | 'password';
};

const InputFormField = ({ label, name, type }: Props) => {
  const { register, getFieldState } = useFormContext();
  const htmlProps = useMemo(
    () => ({
      ...register(name),
      type,
    }),
    [register, name],
  );
  const isValid = getFieldState(name).invalid;

  return <Input htmlProps={htmlProps} isValid={!isValid} label={label} />;
};

export default InputFormField;
