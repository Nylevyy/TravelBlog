import React, { useCallback } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '~/shared/model';
import { Article, deleteArticle } from '~/entities/article';
import { articlesSelectors } from '~/store/ducks/main/articles';
import { appActions } from '~/store/ducks/app';
import * as styles from './Calendar.scss';

const { openModal } = appActions;
const { articlesSelector } = articlesSelectors;

const Calendar = ({ requestError, isLoggedIn }) => {
  const articles = useAppSelector((state) => articlesSelector(state));
  const dispatch = useAppDispatch();
  const onArticleClick = useCallback(
    (payload) => {
      dispatch(openModal({ ...payload }));
    },
    [dispatch],
  );
  const onDeleteClick = useCallback(
    (id) => {
      return () => {
        dispatch(deleteArticle({ id }));
      };
    },
    [dispatch],
  );
  let cachedDate = '';
  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__container}>
        {requestError && (
          <div className={styles.calendar_empty}>
            <h3>Ошибка соединения с сервером</h3>
            <h3>Пожалуйста, повторите попытку</h3>
          </div>
        )}
        {!requestError && !isLoggedIn && (
          <div className={styles.calendar_empty}>
            <h3>Пожалуйста, войдите в систему</h3>
          </div>
        )}
        {!articles.length && !requestError && isLoggedIn && (
          <div className={styles.calendar_empty}>
            <h3>No Articles found</h3>
            <br />
            <h3>Try to create a new one by clicking the button above</h3>
          </div>
        )}
        {!requestError &&
          isLoggedIn &&
          [...articles]
            .sort((a, b) => {
              if (a.date > b.date) return -1;
              return 1;
            })
            .map((item) => {
              const currentDate = moment(item.date).format('D MMMM');
              if (cachedDate !== currentDate) {
                cachedDate = currentDate;
                return (
                  <React.Fragment key={currentDate}>
                    <div className={styles.calendar__date}>
                      <h3>{currentDate}</h3>
                    </div>
                    <Article
                      article={item}
                      key={item.id}
                      onDeleteClick={onDeleteClick}
                      onArticleClick={onArticleClick}
                    />
                  </React.Fragment>
                );
              }
              return (
                <Article
                  article={item}
                  key={item.id}
                  onDeleteClick={onDeleteClick}
                  onArticleClick={onArticleClick}
                />
              );
            })}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  requestError: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Calendar;
