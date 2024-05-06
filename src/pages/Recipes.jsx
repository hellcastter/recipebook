import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Recipes.css';
import DishItem from "../components/dish_item/DishItem.jsx";
import { ApiContext } from "../contexts.js";

const Recipes = () => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [postData, setPostData] = useState([]);

    const receivedData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/photos`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage);
                const postData = slice.map(pd => (
                    <React.Fragment>
                        {/* <p>{pd.title}</p>
                        <img src={pd.thumbnailUrl} alt=""/> */}
                        <DishItem key={pd.title} id={pd.title} name={pd.title} thumb={pd.thumbnailUrl} />
                    </React.Fragment>
                ));

                setPageCount(Math.ceil(data.length / perPage));
                setPostData(postData);
            });
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
            {postData}
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
