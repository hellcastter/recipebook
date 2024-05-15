import {useContext} from 'react';
import useSWR from "swr";

import {ApiContext} from "../../contexts.js";
import CategoryItem from "../catergory_item/CategoryItem.jsx";

function CountriesList() {
    const api = useContext(ApiContext);

    const {data = [], isLoading, error} = useSWR('countries', async () => {
        return api
            .get('list.php?a=list')
            .then(({meals}) => {
                return meals
                    .map((meal) => meal.strArea)
                    .filter((country) => country !== "Russian")
                    .sort()
                    .map(async (name) => {
                        const result = await api.get(`filter.php?a=${name}`);
                        const {strMealThumb: thumb, idMeal: id} = result['meals'][0];
                        return {id, name, thumb};
                    });

            })
            .then((countries) => Promise.all(countries))
    }, {revalidateOnFocus: false});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="categories">
            <h2 className="categories-title">Countries</h2>
            <ul className="categories-list">
                { data.map((country) => (<CategoryItem key={country.id} {...country} path="country"/>)) }
            </ul>
        </div>
    );
};

export default CountriesList;