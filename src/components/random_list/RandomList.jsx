import 'react';
import { useContext } from "react";
import { ApiContext } from "../../contexts.js";

import "./RandomList.css";
import useSWR from "swr";

import refresh from '../../assets/refresh.svg';
import DishItem from "../dish_item/DishItem.jsx";
import PropTypes from "prop-types";
import Loader from "../loader/Loader.jsx";


function RandomList({ items = 10 }) {
    const api = useContext(ApiContext);

    const { data, mutate, error, isLoading, isValidating } = useSWR('meals', async () => {
        const data = [];

        for (let i = 0; i < items; i++) {
            const { idMeal: id, strMeal: name, strMealThumb: thumb } = await api.getRandom();

            data.push({ id, name, thumb });
        }

        return data;
    }, { revalidateOnFocus: false });

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
                    data.map(({ id, name, thumb }) => <DishItem key={id} id={id} name={name} thumb={thumb} />)
                }
            </ul>
        </div>
    );
}

RandomList.propTypes = {
    items: PropTypes.number,
};

export default RandomList;