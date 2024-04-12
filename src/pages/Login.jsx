import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import CategoriesList from "../components/categories_list/CategoriesList.jsx";

import hero from "../assets/hero.jpg";
import Container from "../components/container/Container.jsx";
import CountriesList from "../components/countries_list/CountriesList.jsx";
import RandomList from "../components/random_list/RandomList.jsx";

import LoginForm from "../components/forms/LoginForm"

const Login = () => {
    return (
        <>
            <Container>
                <Header/>
                <LoginForm />
            </Container>
            <Footer/>
        </>
    )
}

export default Login;