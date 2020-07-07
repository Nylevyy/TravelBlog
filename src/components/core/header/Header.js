import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button/Button';
import styles from './Header.scss';

const Header = ({
  title,
  onNewEventClick,
  onRefreshContentClick,
  onTitleClick,
}) => (
  <header className={styles.header}>
    <div className={styles.header__container}>
      <div className={styles.header__logo}>
        <h1 className={styles.header__logoText}>Мой Календарь</h1>
      </div>
      <button
        className={styles.header__titleButton}
        type="button"
        onClick={() => onTitleClick(title)}
      >
        <h2 className={styles.header__titleButtonText}>{title}</h2>
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

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onNewEventClick: PropTypes.func.isRequired,
  onRefreshContentClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default Header;
