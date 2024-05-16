import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import DishItem from '../dish_item/DishItem';

import { ApiContext } from '../../contexts';

import refresh from '../../assets/refresh.svg';

import './RandomList.css';

function RandomList({ items = 10 }) {
  const api = useContext(ApiContext);

  const {
    data, mutate, error, isLoading, isValidating,
  } = useSWR('meals', async () => {
    const datum = [];

    for (let i = 0; i < items; i++) {
      // eslint-disable-next-line no-await-in-loop
      const { idMeal: id, strMeal: name, strMealThumb: thumb } = await api.getRandom();
      datum.push({ id, name, thumb });
    }

    return datum;
  }, { revalidateOnFocus: false });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <div className="categories">
      <h2 className="categories-title">
        <span>
          {items}
          {' '}
          random dishes
        </span>
        <button
          className={`refresh-btn ${isValidating && 'refresh-btn--animate'}`}
          onClick={() => mutate()}
          disabled={isValidating}
          type="button"
        >
          <img src={refresh} alt="Refresh" />
        </button>
      </h2>

      <ul className="categories-list">
        {
          data.map(({ id, name, thumb }) => <DishItem key={id} id={id} name={name} thumb={thumb} />)
        }
      </ul>
    </div>
  );
}

RandomList.propTypes = {
  items: PropTypes.number,
};

export default RandomList;
