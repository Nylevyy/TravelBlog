import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button/Button';
import styles from './Header.scss';

const Header = ({ title, onNewEventClick, onRefreshContentClick }) => {
  Header.propTypes = {
    title: PropTypes.string,
    onNewEventClick: PropTypes.func,
    onRefreshContentClick: PropTypes.func,
  };
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
