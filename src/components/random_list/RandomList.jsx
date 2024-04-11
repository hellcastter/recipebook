import 'react';
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts.js";

import "./RandomList.css";
import useSWR from "swr";

import refresh from '../../assets/refresh.svg';

function RandomItem({name, thumb}) {
    return (
        <li className="dish-item">
            <img src={thumb} alt={name} />
            <p>{name}</p>
        </li>
    );
}


function RandomList({items = 10}) {
    const api = useContext(ApiContext);

    const { data , mutate, error, isLoading, isValidating } = useSWR('meals', async () => {
        const data = [];

        for (let i = 0; i < items; i++) {
            const result = await api.getRandom();
            const meals = result.meals[0];

            data.push({id: meals.idMeal, name: meals.strMeal, thumb: meals.strMealThumb});
         }

        return data;
    }, {revalidateOnFocus: false});

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="categories">
            <h2 className="categories-title">
                <span>{items} random dishes</span>
                <button
                    className={`refresh-btn ${isValidating && 'refresh-btn--animate'}`}
                    onClick={() => mutate()}
                    disabled={isValidating}
                >
                    <img src={refresh} alt="Refresh" />
                </button>
            </h2>

            <ul className="categories-list">
                {
                    data.map(({id, name, thumb}) => <RandomItem key={id} name={name} thumb={thumb} />)
                }
            </ul>
        </div>
    );
}

export default RandomList;