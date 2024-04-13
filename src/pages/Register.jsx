import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Container from "../components/container/Container.jsx";
import RegisterForm from "../components/forms/RegisterForm.jsx"

const Register = () => {
    return (
        <>
            <Container>
                <Header/>
                <RegisterForm />
            </Container>
            <Footer/>
        </>
    )
}

export default Register;