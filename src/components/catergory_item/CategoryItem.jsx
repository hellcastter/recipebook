import 'react';
import PropTypes from 'prop-types';

import './CategoryItem.css'
import {Link} from "react-router-dom";

function CategoryItem({name, thumb, path = "category"}) {
    return (
        <li className="category-item" style={{backgroundImage: `url(${thumb})`}}>
            <Link to={`/${path}/${name}`} className="category-item__link">
                <span className="category-item__name">{name}</span>
            </Link>

        </li>
    );
}

CategoryItem.propTypes = {
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    path: PropTypes.string,
}

export default CategoryItem;