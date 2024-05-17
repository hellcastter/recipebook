import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import srchIcon from '../../assets/search.png';
import './Search.css';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (searchValue.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const data = await response.json();
      if (data.meals) {
        setSearchResults(data.meals.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      setError('Failed to fetch meals. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue, handleSearch]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
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
          value={searchValue}
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
                : error
                  ? <div>{error}</div>
                  : searchResults.length > 0
                    ? searchResults.map((meal) => (
                      <Link
                        className="meal-entry"
                        key={meal.idMeal}
                        to={`/meal/${meal.idMeal}`}
                      >
                        {meal.strMeal}
                      </Link>
                    ))
                    : <div>No results found</div>
            }
          </div>
        )
      }
    </div>
  );
}

export default Search;
