import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import ReactPaginate from 'react-paginate';

import DishItem from "../components/dish_item/DishItem.jsx";
import { UserContext } from "../contexts.js";

import './Recipes.css';

const perPage = 8;

const fetcher = (url) => fetch(url).then(res => res.json());

const usePaginatedData = (dataFetcher, dependencies) => {
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await dataFetcher(offset, perPage);
            setPageCount(Math.ceil(data.totalCount / perPage));
            setPostData(data.items);
        };

        fetchData();
    }, [offset, ...dependencies]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    return { postData, pageCount, handlePageClick };
};

const Recipes = () => {
    const { user } = useContext(UserContext);
    const { data: allRecipes } = useSWR(`http://localhost:3001/recipes?author_id=${user.id}`, fetcher, { revalidateOnFocus: false });

    const fetchLikedPosts = async (offset, limit) => {
        if (!user || !user.liked_posts) return { totalCount: 0, items: [] };

        const data = await Promise.all(
            user.liked_posts
                .slice(offset, offset + limit)
                .map((id) => (
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                        .then(res => res.json())
                        .then(data => data.meals[0])
                ))
        );

        return {
            totalCount: user.liked_posts.length,
            items: data.map(meal => (
                <DishItem key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            ))
        };
    };

    const fetchUserRecipes = async (offset, limit) => {
        if (!allRecipes || !user) return { totalCount: 0, items: [] };

        return {
            totalCount: allRecipes.length,
            items: allRecipes.slice(offset, offset + limit).map(meal => (
                <DishItem key={`own/${meal.id}`} id={`own/${meal.id}`} name={meal.strMeal} thumb={meal.strMealThumb} />
            ))
        };
    };

    const likedPosts = usePaginatedData(fetchLikedPosts, [user]);
    const userRecipes = usePaginatedData(fetchUserRecipes, [allRecipes, user]);

    return (
        <div className='pagination-wrapper'>
            <h1>Liked recipes</h1>
            <div className="wrap-postData">
                {likedPosts.postData}
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={likedPosts.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={likedPosts.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            <div id="bottom-pd">
                <h1>Added recipes</h1>
                <div className="wrap-postData">
                    {userRecipes.postData}
                </div>
            </div>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={userRecipes.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={userRecipes.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Recipes;
