import { useCallback, useState } from 'react';
import ccn from 'classnames';
import { useAppSelector } from '~/shared/model';
import { getBlogTitle } from '../../model';
import { EditTitleModal } from '../edit-title-modal';
import * as styles from './blog-title-button.module.css';

type Props = {
  className?: string;
};

export const BlogTitleButton = ({ className }: Props) => {
  const title = useAppSelector(getBlogTitle);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <button
        className={ccn(styles.blogTitleButton, className)}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <h2>{title ?? 'Отредактируйте заголовок'}</h2>
      </button>
      <EditTitleModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};
