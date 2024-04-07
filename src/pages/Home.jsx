import React from 'react';
import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import CategoriesList from "../components/categories_list/CategoriesList.jsx";

import API from "../api.js";
import {ApiContext} from "../contexts.js";

import hero from "../assets/hero.jpg";
import Container from "../components/container/Container.jsx";
import CountriesList from "../components/countries_list/CountriesList.jsx";
import RandomList from "../components/random_list/RandomList.jsx";


const Home = () => {
    const api = new API("https://www.themealdb.com/api/json/v1/1/");

    return (
        <ApiContext.Provider value={api}>
            <Container>
                <Header/>

                <img src={hero} alt="hero" className="hero" />

                <CategoriesList />
                <CountriesList />

                <RandomList items={10} />

                <Footer/>
            </Container>
        </ApiContext.Provider>
    )
}

export default Home;
