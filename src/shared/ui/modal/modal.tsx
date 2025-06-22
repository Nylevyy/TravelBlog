import { PropsWithChildren, useCallback } from 'react';
import ReactModal from 'react-modal';
import { UiCloseButton } from '../close-button';
import * as styles from './modal.module.css';

type Props = PropsWithChildren<{
  isOpen?: boolean;
  onCloseClick?: () => void;
}>;

ReactModal.setAppElement('#root');

export const Modal = ({ isOpen = false, onCloseClick, children }: Props) => {
  const onCloseButtonClick = useCallback(() => {
    onCloseClick?.();
  }, [onCloseClick]);

  return (
    <ReactModal
      bodyOpenClassName={styles.active}
      className={styles.modal}
      isOpen={isOpen}
      overlayClassName={styles.overlay}
      onAfterClose={onCloseButtonClick}
    >
      <div className={styles.closeButton}>
        <UiCloseButton onClick={onCloseButtonClick} />
      </div>
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
};
