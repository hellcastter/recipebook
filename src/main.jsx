import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home';
import CalorieCounter from './pages/CalorieCounter';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage'

import API from "./api.js";
import {ApiContext} from "./contexts.js";

import './index.css';

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

const api = new API("https://www.themealdb.com/api/json/v1/1/");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiContext.Provider value={api}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  </React.StrictMode>,
)
