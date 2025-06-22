import { CreateArticleButton } from '~/entities/article';
import { RefreshPageButton } from '../refresh-page-button';
import * as styles from './header-buttons.module.css';

export const HeaderButtons = () => {
  return (
    <div className={styles.headerButtons}>
      <CreateArticleButton />
      <RefreshPageButton />
    </div>
  );
};
