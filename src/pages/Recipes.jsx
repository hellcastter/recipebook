import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Recipes.css';
import DishItem from "../components/dish_item/DishItem.jsx";
import { ApiContext } from "../contexts.js";

import useSWR from "swr";
import {UserContext} from "../contexts.js";


const Recipes = () => {
    const [offset1, setOffset1] = useState(0);
    const [offset2, setOffset2] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(8);
    const [currentPage1, setCurrentPage1] = useState(0);
    const [currentPage2, setCurrentPage2] = useState(0);
    const [pageCount1, setPageCount1] = useState(0);
    const [pageCount2, setPageCount2] = useState(0);
    const [postData1, setPostData1] = useState([]);
    const [postData2, setPostData2] = useState([]);

    const {user} = useContext(UserContext);

    const receivedData = async () => {
        if (user && user.liked_posts) {
            const data = await Promise.all(user.liked_posts.slice(offset1, offset1 + perPage).map(id =>
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(res => res.data.meals[0])
            ));
    
            const postData = data.map(meal => (
                <React.Fragment>
                    <DishItem key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
                </React.Fragment>
            ));
    
            setPageCount1(Math.ceil(user.liked_posts.length / perPage));
            setPostData1(postData);
        }
    };

    const receivedData2 = async () => {
        const response = await axios.get(`http://localhost:3001/recipes`);
        const allRecipes = response.data;
    
        const userRecipes = allRecipes.filter(recipe => recipe.author_id === user.id);
    
        const postData = userRecipes.slice(offset2, offset2 + perPage).map(meal => (
            <React.Fragment>
                <DishItem key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </React.Fragment>
        ));
    
        setPageCount2(Math.ceil(userRecipes.length / perPage));
        setPostData2(postData);
    };

    const handlePageClick1 = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage1(selectedPage);
        setOffset1(offset);
    };

    const handlePageClick2 = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
    
        setCurrentPage2(selectedPage);
        setOffset2(offset);
    };

    useEffect(() => {
        receivedData();
    }, [offset1]);
    
    useEffect(() => {
        receivedData2();
    }, [offset2]);

    return (
        <div className='pagination-wrapper'>
            <h1>Liked recipes</h1>
            <div className="wrap-postData">
                {postData1}
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick1}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            <div id="bottom-pd">
                <h1>Added recipes</h1>
                <div className="wrap-postData">
                    {postData2}
                </div>
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount2}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick2}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Recipes;
