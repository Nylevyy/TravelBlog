import { useCallback, useMemo } from 'react';
import { Modal } from '~/shared/ui/modal';
import { useAppDispatch } from '~/shared/model';
import { UiButton } from '~/shared/ui/button';
import { Article, createArticle } from '../../model';
import { ArticleForm } from '../article-form';

type Props = {
  isOpen?: boolean;
  closeModal?: () => void;
};

export const CreateArticleModal = ({ isOpen, closeModal }: Props) => {
  const dispatch = useAppDispatch();

  const defaultValues = useMemo(
    () => ({
      date: new Date().toISOString(),
    }),
    [],
  );

  const onSubmit = useCallback((article: Partial<Article>) => {
    dispatch(createArticle({ article }));
    closeModal?.();
  }, []);

  const actionsSlot = useMemo(
    () => (
      <UiButton
        htmlProps={{ type: 'submit' }}
        label="Готово"
        size="small"
        type="submit"
      />
    ),
    [],
  );

  return (
    <Modal isOpen={isOpen} onCloseClick={closeModal}>
      <ArticleForm
        actionsSlot={actionsSlot}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
