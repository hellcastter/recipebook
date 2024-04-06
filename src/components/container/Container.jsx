import 'react';

import './Container.css';

function Container({ children, className, ...otherProps }) {
    return (
        <div className={`${className} container`} {...otherProps}>
            {children}
        </div>
    );
}

export default Container;