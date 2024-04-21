import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../core/footer/Footer';
import * as styles from './LayoutError.scss';

const LayoutError = ({ children }) => {
  return (
    <div className={styles.layoutError}>
      <header className={styles.layoutError__header} />
      {children}
      <Footer />
    </div>
  );
};

LayoutError.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LayoutError;
