import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './Loader.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
      <BeatLoader loading="true" size="75px" key={Math.random()} />
    </div>
  );
};

export default Loader;
