import * as styles from './close-button.scss';

type Props = {
  onClick: () => void;
};

const CloseButton = ({ onClick }: Props) => {
  return (
    <div className={styles.closeButton}>
      <button
        aria-label="close-button"
        className={styles.button}
        onClick={() => onClick()}
        type="button"
      />
    </div>
  );
};

export default CloseButton;
