import React from 'react';
import PropTypes from 'prop-types';

import './Container.css';

function Container({ children, className, ...otherProps }) {
  return (
    <div className={`${className} container`} {...otherProps}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
