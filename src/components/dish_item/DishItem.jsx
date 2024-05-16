import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './DishItem.css';

function DishItem({ id, name, thumb }) {
  return (
    <li className="dish-item">
      <Link to={`/meal/${id}`} className="dish-item__link">
        <img src={thumb} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  );
}

DishItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default DishItem;
