import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './FetchingSpinner.scss';

const FetchingSpinner = () => {
  return (
    <div className={styles.fetchingSpinner}>
      <BeatLoader loading="true" size="75px" />
    </div>
  );
};

export default FetchingSpinner;
