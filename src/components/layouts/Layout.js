import React from 'react';
import PropTypes from 'prop-types';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import Modal from '../core/modal/Modal';

const Layout = (
  {
    layoutData: {
      header,
      modal,
    },
    children,
  },
) => {
  Layout.propTypes = {
    layoutData: {
      header: PropTypes.object.isRequired,
      modal: PropTypes.object.isRequired,
    },
    children: PropTypes.elementType,
  };
  return (
    <div className="layout">
      <Header headerData={header} />
      <div className="layout__content">
        {children}
      </div>
      <Footer />
      <Modal modalData={modal} />
    </div>
  );
};

export default Layout;
