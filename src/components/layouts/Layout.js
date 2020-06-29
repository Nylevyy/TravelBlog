import React from 'react';
import PropTypes from 'prop-types';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import Modal from '../core/modal/Modal';

const Layout = ({
  layout: { header, modal },
  children,
  onModalCloseClick,
  onNewEventClick,
  onRefreshContentClick,
  onSubmitFormClick,
  onDeleteClick,
}) => {
  Layout.propTypes = {
    layout: PropTypes.shape({
      header: PropTypes.object.isRequired,
      modal: PropTypes.object.isRequired,
    }).isRequired,
    children: PropTypes.element,
    onModalCloseClick: PropTypes.func,
    onNewEventClick: PropTypes.func,
    onRefreshContentClick: PropTypes.func,
    onSubmitFormClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };
  return (
    <div className="layout">
      <Header
        {...header}
        onNewEventClick={onNewEventClick}
        onRefreshContentClick={onRefreshContentClick}
      />
      <div className="layout__content">{children}</div>
      <Footer />
      <Modal
        {...modal}
        onModalCloseClick={onModalCloseClick}
        onSubmitFormClick={onSubmitFormClick}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default Layout;
