import React from 'react';
import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import CategoriesList from "../components/categories_list/CategoriesList.jsx";

import hero from "../assets/hero.jpg";
import Container from "../components/container/Container.jsx";
import CountriesList from "../components/countries_list/CountriesList.jsx";
import RandomList from "../components/random_list/RandomList.jsx";


const Home = () => {
    return (
        <>
            <Container>
                <Header/>

                <img src={hero} alt="hero" className="hero" />

                <CategoriesList />
                <CountriesList />

                <RandomList items={10} />

            </Container>
            <Footer/>
        </>
    )
}

export default Home;
