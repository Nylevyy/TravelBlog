import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './Loader.scss';

const Loader = () => {
  const items = [];
  for (let i = 0; i < 6; i += 1) {
    items.push(<BeatLoader loading="true" size="75px" key={Math.random()} />);
  }
  return <div className={styles.loader}>{items}</div>;
};

export default Loader;
