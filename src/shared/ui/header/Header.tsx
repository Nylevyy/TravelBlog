import { ReactNode } from 'react';
import { redirectToRootPage } from '../../lib/routes';
import * as styles from './header.scss';

type Props = {
  rightWidget?: ReactNode;
  bottomWidget?: ReactNode;
};

const Header = ({ bottomWidget, rightWidget }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topWidget}>
          <button
            className={styles.logo}
            type="button"
            onClick={redirectToRootPage}
          >
            <h3 className={styles.logoText}>Мой Календарь</h3>
            <div className={styles.logoBorder} />
          </button>

          {rightWidget}
        </div>

        <div className={styles.bottomWidget}>{bottomWidget}</div>
      </div>
    </header>
  );
};

export default Header;
