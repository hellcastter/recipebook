import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { ApiContext } from '../contexts';

import MealAside from '../components/meal-aside/MealAside';
import MealMain from '../components/meal_main/MealMain';

import './MealPage.css';

function MealOwnPage() {
  const { id } = useParams();
  const api = useContext(ApiContext);

  const { data, isLoading, error } = useSWR(id, async () => fetch(`http://localhost:3001/recipes/${id}`).then((res) => res.json()));
  const {
    data: randomMeal,
    isLoading: randomIsLoading,
  } = useSWR(`random-${id}`, async () => api.getRandom(), { revalidateOnFocus: false });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Unable to find such a meal</div>;
  }

  return (
    <div className="meal__wrapper">
      <MealMain data={data} id={id} own />
      <MealAside data={data} randomMeal={randomMeal} randomIsLoading={randomIsLoading} own />
    </div>
  );
}

export default MealOwnPage;
