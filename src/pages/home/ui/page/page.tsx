import { useEffect, useMemo } from 'react';
import { BlogTitleButton } from '~/entities/user-config';
import { useAppDispatch } from '~/shared/model';
import { StandardLayout } from '~/widgets/layouts';
import { initializePage } from '../../model';
import { HeaderButtons } from '../header-buttons';
import { ArticlesList } from '../articles-list';
import * as styles from './page.module.css';

export const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializePage());
  }, []);

  const headerSlots = useMemo(
    () => [
      <BlogTitleButton key="1" className={styles.blogTitleButton} />,
      <HeaderButtons key="2" />,
    ],
    [],
  );

  return (
    <StandardLayout headerSlots={headerSlots}>
      <div className={styles.container}>
        <ArticlesList />
      </div>
    </StandardLayout>
  );
};
