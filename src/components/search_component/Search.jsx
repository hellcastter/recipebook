import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Search.css';
import srchIcon from '../../assets/search.png';

import {ApiContext} from '../../contexts.js';

const Search = () => {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        handleSearch();
    };

    const handleCloseInput = () => {
        setTimeout(() => {
            setSearchValue('');
        }, 200);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
            const data = await response.json();
            setSearchResults(data.meals.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch meal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search_wrapper">
            <div className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search" onChange={handleInputChange}
                       onBlur={handleCloseInput}/>

                <button className="searchButton" href="#" onClick={handleSearch}>
                    <img src={srchIcon} alt=""/>
                </button>
            </div>
            {searchValue && (
                <div className="search_examples">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        searchResults.map(meal => (
                            <div className="meal-entry" key={meal.idMeal}
                                 onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                                {meal.strMeal}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;