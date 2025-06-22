import { FormProvider, useForm } from 'react-hook-form';
import { UiButton } from '~/shared/ui/button';
import { InputField } from '~/shared/ui/input';
import { EditTitleFields } from './enums';
import { EditTitleFormValues } from './types';
import * as styles from './edit-title-form.module.css';

type Props = {
  defaultValues?: Partial<EditTitleFormValues>;
  onSubmit: (values: EditTitleFormValues) => void;
};

export const EditTitleForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<EditTitleFormValues>({
    defaultValues,
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className={styles.editTitleForm} onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Заголовок"
          name={EditTitleFields.Title}
          type="text"
        />
        <div className={styles.buttons}>
          <UiButton
            htmlProps={{ type: 'submit' }}
            label="Сохранить"
            size="small"
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};
