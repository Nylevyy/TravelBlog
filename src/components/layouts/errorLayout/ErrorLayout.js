import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../core/footer/Footer';
import styles from './errorLayout.scss';

const ErrorLayout = ({ children }) => {
  ErrorLayout.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    <div className={styles.errorLayout}>
      <header className={styles.errorLayoutHeader} />
      {children}
      <Footer />
    </div>
  );
};

export default ErrorLayout;
