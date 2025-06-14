import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { UiCloseButton } from '~/shared/ui/close-button';
import * as styles from './article.module.css';

const ccn = classNames.bind(styles);

const Article = ({ article, onArticleClick, onDeleteClick }) => {
  const { title, location, date, description, isImportant, id } = article;

  return (
    <article className={styles.article}>
      <button
        aria-label="article-edit"
        type="button"
        className={ccn('button', {
          important: isImportant,
        })}
        onClick={() => {
          onArticleClick({
            data: article,
            modalType: 'articleEditor',
          });
        }}
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
        <UiCloseButton onClick={onDeleteClick(id)} />
      </div>
    </article>
  );
};

Article.propTypes = {
  article: PropTypes.exact({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isImportant: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onArticleClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Article;
