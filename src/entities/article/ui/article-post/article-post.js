import { useCallback, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { UiCloseButton } from '~/shared/ui/close-button';
import { useAppDispatch } from '~/shared/model';
import { deleteArticle } from '../../model';
import { EditArticleModal } from '../edit-article-modal';
import * as styles from './article-post.module.css';

const ccn = classNames.bind(styles);

export const ArticlePost = ({ article }) => {
  const dispatch = useAppDispatch();

  const { title, location, date, description, isImportant, id } = article;
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onPostClick = useCallback(() => {
    setIsOpen(true);
  }, [article.id]);

  const onDeleteClick = useCallback(() => {
    dispatch(deleteArticle({ id }));
  }, [article.id]);

  return (
    <>
      <article className={styles.articlePost}>
        <button
          aria-label="article-edit"
          type="button"
          className={ccn('button', {
            important: isImportant,
          })}
          onClick={onPostClick}
        >
          <div className={styles.info}>
            <div className={styles.time}>
              <span>{moment(date).format('HH:mm')}</span>
            </div>
            <div className={styles.location}>
              <span className={ccn('text', 'locationText')}>{location}</span>
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={ccn('text', 'title')}>{title}</h3>
            <span className={ccn('text', 'description')}>{description}</span>
          </div>
        </button>
        <div className={styles.delete}>
          <UiCloseButton onClick={onDeleteClick} />
        </div>
      </article>
      <EditArticleModal
        article={article}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

ArticlePost.propTypes = {
  article: PropTypes.exact({
    title: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    isImportant: PropTypes.boolean,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
