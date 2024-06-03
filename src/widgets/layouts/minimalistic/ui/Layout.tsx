import { PropsWithChildren } from 'react';
import Footer from '~/components/core/footer/Footer';
import * as styles from './Layout.scss';

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
