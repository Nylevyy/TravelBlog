import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import UiButton, {
  uiButton_submit,
  uiButton_refresh,
} from '../../ui/button/UiButton';
import styles from './Header.scss';

const ccn = classNames.bind(styles);

const Header = ({
  title,
  onNewEventClick,
  onRefreshContentClick,
  onTitleClick,
  onLogoClick,
}) => (
  <header className={styles.header}>
    <div className={styles.header__container}>
      <div className={styles.header__dashboard}>
        <button
          className={ccn('header__logo')}
          type="button"
          onClick={() => onLogoClick()}
        >
          <h3 className={styles.header__logoText}>Мой Календарь</h3>
          <div className={styles.header__logoBorder} />
        </button>
      </div>
      <button
        className={styles.header__titleButton}
        type="button"
        onClick={() => onTitleClick(title)}
      >
        <h2 className={styles.header__titleButtonText}>{title}</h2>
      </button>
      <div className={styles.header__buttons}>
        <UiButton
          onClick={onNewEventClick}
          label="Событие +"
          className={ccn(uiButton_submit)}
        />
        <UiButton
          onClick={onRefreshContentClick}
          label="Обновить"
          className={ccn(uiButton_refresh)}
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
  onLogoClick: PropTypes.func.isRequired,
};

export default Header;
