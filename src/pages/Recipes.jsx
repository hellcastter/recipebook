import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import ReactPaginate from 'react-paginate';

import DishItem from '../components/dish_item/DishItem';
import { UserContext } from '../contexts';

import './Recipes.css';

function Recipes() {
  const perPage = 8;

  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [pageCount1, setPageCount1] = useState(0);
  const [pageCount2, setPageCount2] = useState(0);
  const [postData1, setPostData1] = useState([]);
  const [postData2, setPostData2] = useState([]);

  const { user } = useContext(UserContext);

  const fetchLikedPosts = useCallback(async () => {
    if (user?.liked_posts) {
      const likedPostsSlice = user.liked_posts.toReversed().slice(offset1, offset1 + perPage);
      const data = await Promise.all(
        likedPostsSlice.map((id) => (
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((datum) => datum.meals[0])
        )),
      );

      const postData = data.map((meal) => (
        <DishItem
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          thumb={meal.strMealThumb}
        />
      ));

      setPageCount1(Math.ceil(user.liked_posts.length / perPage));
      setPostData1(postData);
    }
  }, [offset1, user]);

  const fetchUserRecipes = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/recipes?author_id=${user.id}`);
    const userRecipes = await response.json();

    const userRecipesSlice = userRecipes.slice(offset2, offset2 + perPage);

    const postData = userRecipesSlice.map((meal) => (
      <DishItem key={`own/${meal.id}`} id={`own/${meal.id}`} name={meal.strMeal} thumb={meal.strMealThumb} />
    ));

    setPageCount2(Math.ceil(userRecipes.length / perPage));
    setPostData2(postData);
  }, [offset2, user.id]);

  const handlePageChange = (e, setter) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setter(offset);
  };

  useEffect(() => {
    fetchLikedPosts();
  }, [fetchLikedPosts]);

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

  return (
    <div className="pagination-wrapper">
      <h1>Liked recipes</h1>
      <div className="wrap-postData">
        {postData1}
      </div>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => handlePageChange(e, setOffset1)}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />

      <div id="bottom-pd">
        <h1>Added recipes</h1>
        <div className="wrap-postData">
          {postData2}
        </div>
      </div>
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount2}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => handlePageChange(e, setOffset2)}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default Recipes;
