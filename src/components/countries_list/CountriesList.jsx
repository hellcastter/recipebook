import {useContext, useEffect, useState} from 'react';
import {ApiContext} from "../../contexts.js";
import CategoryItem from "../catergory_item/CategoryItem.jsx";

function CountryItem({strArea, strAreaThumb}) {
    return (
        <li className="category-item" style={{backgroundImage: `url(${strAreaThumb})`}}>
            {strArea}
        </li>
    );
}

function CountriesList() {
    {/*www.themealdb.com/api/json/v1/1/*/
    }

    const api = useContext(ApiContext);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        api.get('list.php?a=list')
            .then(({meals}) => {
                const countries = meals
                    .map((meal) => meal.strArea)
                    .filter((country) => country != "Russian")
                    .sort()
                    .map(async (name) => {
                        const result = await api.get(`filter.php?a=${name}`);
                        const {strMealThumb: thumb, idMeal: id} = result['meals'][0];
                        return {id, name, thumb};
                    });

                Promise
                    .all(countries)
                    .then((result) => setCountries(result))
            });
    }, [api]);

    return (
        <div className="categories">
            <h2 className="categories-title">Countries</h2>
            <ul className="categories-list">
                {
                    countries.map((country) => (
                        <CategoryItem key={country.id} {...country}/>
                    ))
                }
            </ul>
        </div>
    );
}

export default CountriesList;