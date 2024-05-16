import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import MealYoutube from '../meal_youtube/MealYoutube';
import MealInstructions from '../meal_instructions/MealInstructions';
import MealComments from '../meal_comments/MealComments';

import { UserContext } from '../../contexts';

import heart from '../../assets/heart.svg';

import './MealMain.css';

function MealMain({ data, id, own = false }) {
  const { user, setUser } = useContext(UserContext);

  const onLikeClick = async () => {
    let likedPosts;

    if (user.liked_posts && user.liked_posts.includes(id)) {
      likedPosts = user.liked_posts.filter((item) => item !== id);
      setUser({ ...user, liked_posts: likedPosts });
    } else {
      likedPosts = [...(user.liked_posts || []), id];
      setUser({ ...user, liked_posts: likedPosts });
    }

    localStorage.setItem('user', JSON.stringify({ ...user, liked_posts: likedPosts }));

    // save to the server
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked_posts: likedPosts }),
    });
  };

  const strIngredient = own
    ? data.strIngredient
      .split('\n')
      .map((item) => <li key={item}>{item}</li>)
    : Object.entries(data)
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([key, value]) => (
        <li key={key}>
          {value}
          {' '}
          -
          {data[`strMeasure${key.slice(13)}`]}
        </li>
      ));

  return (
    <main className="meal__main">
      <h1 className="meal__title">
        <span>{data.strMeal}</span>

        {
          !own && user && user.liked_posts && (
            <button
              className={`meal__favourite-button ${user.liked_posts.includes(id) && 'liked'}`}
              onClick={onLikeClick}
              type="button"
              label="Add to Favourites"
            >
              <SVG
                src={heart}
                width={25}
                height="auto"
                title="Add to Favourites"
              />
            </button>
          )
        }

      </h1>

      {
        data.strMealThumb
            && <img src={data.strMealThumb} alt={data.strMeal} className="meal__main-image" />
      }

      {
        data.strImageSource && (
          <p>
            <a href={data.strImageSource} target="_blank" rel="noopener noreferrer">
              Image source
            </a>
          </p>
        )
      }

      <h2>Ingredients</h2>
      <ul>
        {strIngredient}
      </ul>

      <MealInstructions instructions={data.strInstructions} source={data.strSource} />

      <MealYoutube title={data.strMeal} strYoutube={data.strYoutube} />

      <h2>Comments</h2>
      <MealComments id={own ? data.id : data.idMeal} />
    </main>
  );
}

MealMain.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  own: PropTypes.bool,
};

export default MealMain;
