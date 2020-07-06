import React from 'react';
import PropTypes from 'prop-types';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import Modal from '../core/modal/Modal';

const Layout = ({
  modal,
  children,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
}) => {
  Layout.propTypes = {
    modal: PropTypes.objectOf(PropTypes.any).isRequired,
    children: PropTypes.element,
    onModalCloseClick: PropTypes.func,
    onSubmitFormClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };
  return (
    <div className="layout">
      <Header />
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
