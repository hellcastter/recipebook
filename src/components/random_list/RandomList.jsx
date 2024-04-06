import 'react';
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts.js";
// import CategoryItem from "../catergory_item/CategoryItem.jsx";

import "./RandomList.css";

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
    const [randomList, setRandomList] = useState([]);

    useEffect(() => {
        setRandomList([]);

        for (let i = 0; i < items; i++) {
            api.getRandom().then(({meals}) => {
                const meal = meals[0];
                const {idMeal: id, strMeal: name, strMealThumb: thumb} = meal;

                setRandomList((randomList) => [...randomList, {id, name, thumb}]);
            });
        }
    }, []);

    return (
        <div className="categories">
            <h2 className="categories-title">{items} random dishes</h2>
            <ul className="categories-list">
                {
                    randomList.map(({id, name, thumb}) => <RandomItem key={id} name={name} thumb={thumb} />)
                }
            </ul>
        </div>
    );
}

export default RandomList;