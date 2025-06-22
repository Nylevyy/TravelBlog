import { ReactNode } from 'react';
import { redirectToRootPage } from '../../lib/routes';
import * as styles from './header.module.css';

type Props = {
  slots?: ReactNode[];
};

const Header = ({ slots = [] }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.logo}
          type="button"
          onClick={redirectToRootPage}
        >
          <h3 className={styles.logoText}>Мой Календарь</h3>
          <div className={styles.logoBorder} />
        </button>

        {slots.map((slot) => slot)}
      </div>
    </header>
  );
};

export default Header;
