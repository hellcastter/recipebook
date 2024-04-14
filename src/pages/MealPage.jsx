import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Container from "../components/container/Container.jsx";
import DishItem from '../components/dish_item/DishItem.jsx';

import { ApiContext } from '../contexts.js';

import './MealPage.css';
import MealAside from "../components/meal-aside/MealAside.jsx";
import MealMain from "../components/meal_main/MealMain.jsx";

const MealPage = () => {
    const { id } = useParams();
    const api = useContext(ApiContext);

    const { data, isLoading, error } = useSWR(id, async () => api.getMeal(id));
    const { data: randomMeal, isLoading: randomIsLoading } = useSWR(`random-${id}`, async () => api.getRandom(), { revalidateOnFocus: false });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Container>
                <Header />

                <div className="meal__wrapper">
                    <MealMain data={data} />
                    <MealAside data={data} randomMeal={randomMeal} randomIsLoading={randomIsLoading} />
                </div>

            </Container>
            <Footer />
        </>
    );
}

export default MealPage;