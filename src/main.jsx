import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import Home from './pages/Home';
import CalorieCounter from './pages/CalorieCounter';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/CalorieCounter",
    element: <CalorieCounter />,
  },
  {
    path: "/Recipes",
    element: <Recipes />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
