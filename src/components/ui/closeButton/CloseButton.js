import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseButton.scss';

const CloseButton = ({ onClick }) => {
  CloseButton.propTypes = {
    onClick: PropTypes.func,
  };
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

export default CloseButton;
