import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button/Button';
import './Header.scss';

const Header = (
  {
    headerData: {
      title,
      onNewEventClick,
      onRefreshContentClick,
    },
  },
) => {
  Header.propTypes = {
    headerData: PropTypes.exact(
      {
        title: PropTypes.string,
        onNewEventClick: PropTypes.func,
        onRefreshContentClick: PropTypes.func,
      },
    ),
  };
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1 className="header__logo_text">Календарь</h1>
        </div>
        <div className="header__subtitle">
          <h2 className="header__subtitle_text">
            {title}
          </h2>
        </div>
        <div className="header__buttons buttons">
          <Button
            onClick={onNewEventClick}
            value="Событие +"
            key="newEvent"
            type="button"
            mod="_submit"
          />
          <Button
            onClick={onRefreshContentClick}
            value="Обновить"
            key="refresh"
            type="button"
            mod="_refresh"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
