import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import useSWR from 'swr';


import {ApiContext} from '../contexts.js';

import './MealPage.css';
import MealAside from "../components/meal-aside/MealAside.jsx";
import MealMain from "../components/meal_main/MealMain.jsx";

const MealPage = () => {
    const {id} = useParams();
    const api = useContext(ApiContext);

    const {data, isLoading, error} = useSWR(id, async () => api.getMeal(id));
    const {
        data: randomMeal,
        isLoading: randomIsLoading
    } = useSWR(`random-${id}`, async () => api.getRandom(), {revalidateOnFocus: false});


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="meal__wrapper">
            <MealMain data={data} id={id}/>
            <MealAside data={data} randomMeal={randomMeal} randomIsLoading={randomIsLoading}/>
        </div>
    );
}

export default MealPage;