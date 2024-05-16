import React, { useState, useMemo, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage';
import MealPage from './pages/MealPage';
import PageLayout from './pages/PageLayout';
import AddPage from './pages/AddPage';
import MealOwnPage from './pages/MealOwnPage';

import API from './api';
import { ApiContext, UserContext } from './contexts';

const router = createBrowserRouter([{
  element: <PageLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    }, {
      path: '/recipes',
      element: <Recipes />,
    }, {
      path: '/login',
      element: <Login />,
    }, {
      path: '/register',
      element: <Register />,
    }, {
      path: '/add',
      element: <AddPage />,
    }, {
      path: '/category/:name',
      element: <CategoryPage type="category" />,
    }, {
      path: '/country/:name',
      element: <CategoryPage type="country" />,
    }, {
      path: '/meal/own/:id',
      element: <MealOwnPage />,
    }, {
      path: '/meal/:id',
      element: <MealPage />,
    }, {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
}]);

function App() {
  const api = useMemo(() => new API('https://www.themealdb.com/api/json/v1/1/'), []);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const saveUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const userContextValue = useMemo(() => ({ user, setUser: saveUser }), [user, saveUser]);

  return (
    <ApiContext.Provider value={api}>
      <UserContext.Provider value={userContextValue}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </ApiContext.Provider>
  );
}

export default App;
