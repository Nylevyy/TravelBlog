import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/button/Button';
import styles from './Header.scss';
import { calendarActions } from '~/store/ducks/calendar';
import { appActions } from '~/store/ducks/app';

const { refreshArticles } = calendarActions;
const { openModal, setDefault } = appActions;

const Header = () => {
  const { title } = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const onNewEventClick = useCallback(() => {
    dispatch(openModal({ modalType: 'articleEditor', data: null }));
  }, [dispatch]);
  const onRefreshContentClick = useCallback(() => {
    dispatch(setDefault());
    dispatch(refreshArticles());
  }, [dispatch]);
  const onTitleClick = useCallback(
    (oldTitle) => {
      dispatch(
        openModal({ data: { title: oldTitle }, modalType: 'titleEditor' })
      );
    },
    [dispatch]
  );
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <h1 className={styles.header__logo__text}>Мой Календарь</h1>
        </div>
        <button
          className={styles.header__titleButton}
          type="button"
          onClick={() => onTitleClick(title)}
        >
          <h2 className={styles.header__titleButton__text}>{title}</h2>
        </button>
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
