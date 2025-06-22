import { Fragment } from 'react';
import { useAppSelector } from '~/shared/model';
import { ArticlePost, getArticleError, getArticles } from '~/entities/article';
import { groupArticlesByDate } from './utils';
import * as styles from './articles-list.module.css';

export const ArticlesList = () => {
  const articles = useAppSelector(getArticles);
  const articlesError = useAppSelector(getArticleError);

  if (articlesError) {
    return (
      <div className={styles.articlesList}>
        <div className={styles.emptyMessage}>
          <h3>Ошибка соединения с сервером</h3>
          <h3>Пожалуйста, повторите попытку</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.articlesList}>
      {!articles?.length && (
        <div className={styles.emptyMessage}>
          <h3>No Articles found</h3>
          <br />
          <h3>Try to create a new one by clicking the button above</h3>
        </div>
      )}

      {articles?.length > 0 &&
        Object.entries(groupArticlesByDate(articles)).map(([date, entries]) => (
          <Fragment key={date}>
            <div className={styles.date}>
              <h3>{date}</h3>
            </div>
            {entries.map((item) => (
              <ArticlePost key={item.id} article={item} />
            ))}
          </Fragment>
        ))}
    </div>
  );
};
