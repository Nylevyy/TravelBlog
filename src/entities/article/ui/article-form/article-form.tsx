import { ReactNode, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField } from '~/shared/ui/input';
import { InputTextareaField } from '~/shared/ui/input-textarea';
import { CheckboxField } from '~/shared/ui/checkbox';
import { DatePickerField } from '~/shared/ui/date-picker';
import { type Article } from '../../model';
import { ArticleFormField } from './enums';
import { ArticleFormType } from './types';
import { mapFormToModel } from './mappers';
import * as styles from './article-form.module.css';

type Props = {
  defaultValues?: Partial<Article>;
  onSubmit: (values: Partial<Article>) => void;
  actionsSlot?: ReactNode;
};

export const ArticleForm = ({
  defaultValues,
  onSubmit,
  actionsSlot,
}: Props) => {
  const form = useForm<ArticleFormType>({
    defaultValues,
  });
  const { handleSubmit } = form;

  const submitCallback = useCallback(
    (values: ArticleFormType): void => onSubmit(mapFormToModel(values)),
    [],
  );

  return (
    <FormProvider {...form}>
      <form
        className={styles.articleForm}
        onSubmit={handleSubmit(submitCallback)}
      >
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <InputField
              label="Событие"
              name={ArticleFormField.Title}
              type="text"
            />
            <div className={styles.wrap}>
              <InputField
                label="Место"
                name={ArticleFormField.Location}
                type="text"
              />
              <DatePickerField name={ArticleFormField.Date} />
            </div>
          </div>

          <InputTextareaField
            name={ArticleFormField.Description}
            htmlProps={{
              placeholder: 'Описание',
              rows: 8,
              cols: 25,
            }}
          />
        </div>

        <div className={styles.footer}>
          <CheckboxField
            label="Пометить событие как важное"
            name={ArticleFormField.IsSignificant}
          />

          <div className={styles.buttons}>{actionsSlot}</div>
        </div>
      </form>
    </FormProvider>
  );
};
