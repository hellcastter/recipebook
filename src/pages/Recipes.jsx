import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Recipes.css';
import DishItem from "../components/dish_item/DishItem.jsx";
import { ApiContext } from "../contexts.js";

import useSWR from "swr";
import {UserContext} from "../contexts.js";


const Recipes = () => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [postData, setPostData] = useState([]);

    const {user} = useContext(UserContext);

    const receivedData = async () => {
        if (user && user.liked_posts) {
            const data = await Promise.all(user.liked_posts.slice(offset, offset + perPage).map(id =>
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(res => res.data.meals[0])
            ));
    
            const postData = data.map(meal => (
                <React.Fragment>
                    <DishItem key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
                </React.Fragment>
            ));
    
            setPageCount(Math.ceil(user.liked_posts.length / perPage));
            setPostData(postData);
        }
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
    };

    useEffect(() => {
        receivedData();
    }, [offset]);

    return (
        <div className='pagination-wrapper'>
            <h1>Liked recipes</h1>
            <div className="wrap-postData">
                {postData}
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            <div id="bottom-pd">
                <h1>Added recipes</h1>
                <div className="wrap-postData">
                    {postData}
                </div>
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Recipes;
