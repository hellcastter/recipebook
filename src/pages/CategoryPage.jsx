import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useSWR from "swr";


import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Container from "../components/container/Container.jsx";
import DishItem from "../components/dish_item/DishItem.jsx";

import { ApiContext } from "../contexts.js";


const CategoryPage = ({ type }) => {
    const { name } = useParams();
    const api = useContext(ApiContext);

    const { data = [], error, isLoading } = useSWR(
        `/filter.php?${type == 'country' ? 'a' : 'c'}=${name}`,
        async (url) => {
            return api
                .get(url)
                .then(({ meals }) => meals || []);
        }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            <Container>
                <Header />

                <h1>#{name}</h1>

                <ul className="categories-page__list">
                    {
                        data.map(({ idMeal, strMeal, strMealThumb }) => (
                            <DishItem key={idMeal} id={idMeal} name={strMeal} thumb={strMealThumb} />
                        ))
                    }
                </ul>
            </Container>
            <Footer />
        </>
    )
}

CategoryPage.propTypes = {
    type: PropTypes.oneOf(['category', 'country']).isRequired
}

export default CategoryPage;