import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import srchIcon from '../../assets/search.png';

import './Search.css';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = async (event) => {
    setSearchValue(event.target.value);
    await handleSearch();
  };

  const handleCloseInput = () => {
    setTimeout(() => {
      setSearchValue('');
    }, 200);
  };

  return (
    <div className="search_wrapper">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          onBlur={handleCloseInput}
        />

        <button className="searchButton" onClick={handleSearch} type="button">
          <img src={srchIcon} alt="Search" />
        </button>
      </div>

      {
        searchValue && (
          <div className="search_examples">
            {
              isLoading
                ? <div>Loading...</div>
                : searchResults.map((meal) => (
                  <Link
                    className="meal-entry"
                    key={meal.idMeal}
                    to={`/meal/${meal.idMeal}`}
                  >
                    {meal.strMeal}
                  </Link>
                ))
              }
          </div>
        )
      }
    </div>
  );
}

export default Search;
