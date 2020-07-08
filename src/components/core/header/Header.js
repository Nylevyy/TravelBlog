import React from 'react';
import PropTypes from 'prop-types';
import Button, {
  uiButton_submit,
  uiButton_refresh,
} from '../../ui/button/Button';
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
        <h3 className={styles.header__logoText}>Мой Календарь</h3>
        <div className={styles.header__logoBorder} />
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
          label="Событие +"
          key="newEvent"
          type="button"
          className={uiButton_submit}
        />
        <Button
          onClick={onRefreshContentClick}
          label="Обновить"
          key="refresh"
          type="button"
          className={uiButton_refresh}
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
