import {useContext} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import useSWR from "swr";

import DishItem from "../components/dish_item/DishItem.jsx";

import {ApiContext} from "../contexts.js";

import './App.css'

const CategoryPage = ({type}) => {
    const {name} = useParams();
    const api = useContext(ApiContext);

    const {data = [], error, isLoading} = useSWR(
        `/filter.php?${type === 'country' ? 'a' : 'c'}=${name}`,
        async (url) => {
            return api
                .get(url)
                .then(({meals}) => meals || []);
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1>#{name}</h1>

            <ul className="categories-page__list">
                {
                    data.map(({idMeal, strMeal, strMealThumb}) => (
                        <DishItem key={idMeal} id={idMeal} name={strMeal} thumb={strMealThumb}/>
                    ))
                }
            </ul>
        </>
    );
};

CategoryPage.propTypes = {
    type: PropTypes.oneOf(['category', 'country']).isRequired
}

export default CategoryPage;