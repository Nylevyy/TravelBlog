import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/button/Button';
import styles from './Header.scss';
import { calendarActions } from '~/store/ducks/calendar';
import { appActions } from '~/store/ducks/app';

const { refreshArticles } = calendarActions;
const { openModal } = appActions;

const Header = () => {
  const { title } = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const onNewEventClick = useCallback(() => {
    dispatch(openModal({ type: 'articleEditor', data: null }));
  }, [dispatch]);
  const onRefreshContentClick = useCallback(() => {
    dispatch(refreshArticles());
  }, [dispatch]);
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <h1 className={styles.header__logo_text}>Мой Календарь</h1>
        </div>
        <div className={styles.header__subtitle}>
          <h2 className={styles.header__subtitle_text}>{title}</h2>
        </div>
        <div className={styles.header__buttons}>
          <Button
            onClick={onNewEventClick}
            value="Событие +"
            key="newEvent"
            type="button"
            className="button_submit"
          />
          <Button
            onClick={onRefreshContentClick}
            value="Обновить"
            key="refresh"
            type="button"
            className="button_refresh"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
