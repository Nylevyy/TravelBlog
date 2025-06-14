import { FormProvider, useForm } from 'react-hook-form';
import { UiButton } from '~/shared/ui/button';
import { InputField } from '~/shared/ui/input';
import { TitleFields } from './enums';
import { TitleFormValues } from './types';
import * as styles from './title-form.module.css';

type Props = {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmitFormClick: Function; // TODO
};

const TitleForm = ({ title, onSubmitFormClick }: Props) => {
  const form = useForm<TitleFormValues>({
    defaultValues: {
      [TitleFields.Title]: title,
    },
  });
  const { handleSubmit } = form;

  const onSubmitForm = (data: TitleFormValues) => {
    onSubmitFormClick(
      { title: data[TitleFields.Title] },
      { type: 'titleEditor' },
    );
  };
  return (
    <FormProvider {...form}>
      <form className={styles.titleForm} onSubmit={handleSubmit(onSubmitForm)}>
        <InputField label="Заголовок" name="title" type="text" />
        <div className={styles.buttons}>
          <UiButton
            htmlProps={{ type: 'submit' }}
            label="Готово"
            size="small"
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default TitleForm;
