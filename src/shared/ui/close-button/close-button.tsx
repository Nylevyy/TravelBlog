import * as styles from './close-button.module.css';

type Props = {
  onClick: () => void;
};

const CloseButton = ({ onClick }: Props) => {
  return (
    <div className={styles.closeButton}>
      <button
        aria-label="close-button"
        className={styles.button}
        type="button"
        onClick={() => onClick()}
      />
    </div>
  );
};

export default CloseButton;
