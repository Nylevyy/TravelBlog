import { PropsWithChildren } from 'react';
import { Footer } from '~/shared/ui/footer';
import * as styles from './layout.scss';

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
