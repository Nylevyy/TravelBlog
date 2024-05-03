import BeatLoader from 'react-spinners/BeatLoader';
import * as styles from './Loader.scss';

const Loader = () => {
  const items = new Array(7)
    .fill(null)
    // eslint-disable-next-line react/no-array-index-key
    .map((_, index) => <BeatLoader loading size="75px" key={index} />);

  return <div className={styles.loader}>{items}</div>;
};

export default Loader;
