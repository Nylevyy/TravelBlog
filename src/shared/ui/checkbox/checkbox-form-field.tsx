import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from './checkbox';

type Props = {
  label?: string;
  name: string;
};

const CheckboxFormField = ({ label, name }: Props) => {
  const { register } = useFormContext();
  const htmlProps = useMemo(() => register(name), [register, name]);

  return <Checkbox htmlProps={htmlProps} label={label} />;
};

export default CheckboxFormField;
