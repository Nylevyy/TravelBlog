import BeatLoader from 'react-spinners/BeatLoader';
import * as styles from './loader.module.css';

const Loader = () => {
  const items = new Array(7)
    .fill(null)
    // eslint-disable-next-line react/no-array-index-key
    .map((_, index) => <BeatLoader key={index} loading size="75px" />);

  return <div className={styles.loader}>{items}</div>;
};

export default Loader;
