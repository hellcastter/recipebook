import {useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage'
import CategoryPage from "./pages/CategoryPage.jsx";
import MealPage from "./pages/MealPage.jsx";

import API from "./api.js";
import {ApiContext, UserContext} from "./contexts.js";
import PageLayout from "./pages/PageLayout.jsx";
import AddPage from "./pages/AddPage.jsx";
import MealOwnPage from "./pages/MealOwnPage.jsx";

const router = createBrowserRouter([{
    element: <PageLayout/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        }, {
            path: "/recipes",
            element: <Recipes/>,
        }, {
            path: "/login",
            element: <Login/>,
        }, {
            path: "/register",
            element: <Register/>,
        }, {
            path: "/add",
            element: <AddPage/>,
        }, {
            path: "/category/:name",
            element: <CategoryPage type="category"/>
        }, {
            path: "/country/:name",
            element: <CategoryPage type="country"/>
        }, {
            path: "/meal/own/:id",
            element: <MealOwnPage/>
        }, {
            path: "/meal/:id",
            element: <MealPage/>
        }, {
            path: "*",
            element: <NotFoundPage/>,
        }
    ]
}]);


const App = () => {
    const api = new API("https://www.themealdb.com/api/json/v1/1/");

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const saveUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    return (
        <ApiContext.Provider value={api}>
            <UserContext.Provider value={{user, setUser: saveUser}}>
                <RouterProvider router={router}/>
            </UserContext.Provider>
        </ApiContext.Provider>
    );
}

export default App;