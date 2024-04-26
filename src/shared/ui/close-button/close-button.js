import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './close-button.scss';

const CloseButton = ({ onClick }) => {
  return (
    <div className={styles.closeButton}>
      <button
        aria-label="close-button"
        className={styles.closeButton__button}
        onClick={() => onClick()}
        type="button"
      />
    </div>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

export default CloseButton;
