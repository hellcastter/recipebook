import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts';
import AddMealForm from '../components/add_meal_form/AddMealForm';

function AddPage() {
  const { user } = useContext(UserContext);
  const userNavigate = useNavigate();

  if (!user) {
    userNavigate('/');
  }

  // add own recipe
  return (
    <>
      <h1 className="add-page__title">Add Recipe</h1>
      <AddMealForm />
    </>
  );
}

export default AddPage;
