import { useCallback, useMemo } from 'react';
import { Modal } from '~/shared/ui/modal';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { editBlogTitle, getBlogConfig } from '../../model';
import { EditTitleForm } from '../edit-title-form';

type Props = {
  isOpen?: boolean;
  closeModal?: () => void;
};

export const EditTitleModal = ({ isOpen, closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const blogConfig = useAppSelector(getBlogConfig);

  const defaultValues = useMemo(
    () => ({
      title: blogConfig?.title ?? undefined,
    }),
    [blogConfig],
  );

  const onSubmit = useCallback(({ title }: { title?: string }) => {
    dispatch(editBlogTitle(title ?? ''));
    closeModal?.();
  }, []);

  return (
    <Modal isOpen={isOpen} onCloseClick={closeModal}>
      <EditTitleForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </Modal>
  );
};
