import { useCallback, useMemo } from 'react';
import { Modal } from '~/shared/ui/modal';
import { useAppDispatch } from '~/shared/model';
import { UiButton } from '~/shared/ui/button';
import { Article, updateArticle } from '../../model';
import { ArticleForm } from '../article-form';

type Props = {
  isOpen?: boolean;
  closeModal?: () => void;
  article: Article;
};

export const EditArticleModal = ({ article, isOpen, closeModal }: Props) => {
  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => article, []);

  const onSubmit = useCallback((articleFromForm: Partial<Article>) => {
    dispatch(
      updateArticle({
        article: {
          id: article.id,
          ...articleFromForm,
        },
        id: article.id,
      }),
    );
    closeModal?.();
  }, []);

  const actionsSlot = useMemo(
    () => (
      <>
        <UiButton
          htmlProps={{ type: 'submit' }}
          label="Готово"
          size="small"
          type="submit"
        />
        <UiButton
          htmlProps={{ type: 'reset' }}
          label="Удалить"
          size="small"
          type="reset"
        />
      </>
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
