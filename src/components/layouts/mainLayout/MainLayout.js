import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../core/header/Header';
import Footer from '../../core/footer/Footer';
import Modal from '../../core/modal/Modal';

const MainLayout = ({
  modal,
  children,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
}) => {
  MainLayout.propTypes = {
    modal: PropTypes.objectOf(PropTypes.any).isRequired,
    children: PropTypes.element,
    onModalCloseClick: PropTypes.func,
    onSubmitFormClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  };
  return (
    <div className="mainLayout">
      <Header />
      <div className="mainLayout__content">{children}</div>
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

export default MainLayout;
