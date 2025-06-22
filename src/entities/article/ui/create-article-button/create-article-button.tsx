import { useCallback, useState } from 'react';
import { UiButton } from '~/shared/ui/button';
import { CreateArticleModal } from '../create-article-modal';

export const CreateArticleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSuccessSubmit = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <UiButton
        label="Событие +"
        type="submit"
        onClick={() => setIsOpen(true)}
      />
      <CreateArticleModal closeModal={onSuccessSubmit} isOpen={isOpen} />
    </>
  );
};
