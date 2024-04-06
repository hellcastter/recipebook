import React from 'react'
import './App.css'

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import CategoriesList from "./components/categories_list/CategoriesList.jsx";

import API from "./api.js";
import {ApiContext} from "./contexts.js";


function App() {
    const api = new API("https://www.themealdb.com/api/json/v1/1/");

    return (
        <ApiContext.Provider value={api}>
            <Header/>

            <CategoriesList />

            <Footer/>
        </ApiContext.Provider>
    )
}

export default App;
