import { PropsWithChildren, ReactNode } from 'react';
import { Footer } from '~/shared/ui/footer';
import { Header } from '~/shared/ui/header';
import * as styles from './layout.module.css';

type Props = PropsWithChildren & {
  headerSlots?: ReactNode[];
};

const Layout = ({ children, headerSlots = [] }: Props) => {
  return (
    <div className={styles.layout}>
      <Header slots={headerSlots} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
