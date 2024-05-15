import {useContext} from "react";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import MealYoutube from "../meal_youtube/MealYoutube.jsx";
import MealInstructions from "../meal_instructions/MealInstructions.jsx";
import MealComments from "../meal_comments/MealComments.jsx";

import {UserContext} from "../../contexts.js";

import heart from "../../assets/heart.svg";

import "./MealMain.css";

const MealMain = ({data, id, own = false}) => {
    const {user, setUser} = useContext(UserContext);

    const onLikeClick = async () => {
        let liked_posts;

        if (user.liked_posts && user.liked_posts.includes(id)) {
            liked_posts = user.liked_posts.filter((item) => item !== id);
            setUser({...user, liked_posts});
        } else {
            liked_posts = [...(user.liked_posts || []), id];
            setUser({...user, liked_posts});
        }

        localStorage.setItem("user", JSON.stringify({...user, liked_posts}));

        // save to the server
        await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({liked_posts})
        });
    }


    const strIngredient = own ?
            data.strIngredient
                .split("\n")
                .map((item) => <li key={item}>{item}</li>) :
            Object.entries(data)
                .filter(([key, value]) => key.startsWith("strIngredient") && value)
                .map(([key, value]) => (
                    <li key={key}>
                        {value} - {data[`strMeasure${key.slice(13)}`]}
                    </li>
                ))

    return (
        <main className="meal__main">
            <h1 className="meal__title">
                <span>{data.strMeal}</span>

                {
                    user && user.liked_posts &&
                        <button
                            className={`meal__favourite-button ${user.liked_posts.includes(id) && "liked"}`}
                            onClick={onLikeClick}
                        >
                            <SVG
                                src={heart}
                                width={25}
                                height="auto"
                                title="Add to Favourites"
                            />
                        </button>
                }

            </h1>

            {
                data.strMealThumb &&
                    <img src={data.strMealThumb} alt={data.strMeal} className="meal__main-image"/>
            }

            {
                data.strImageSource &&
                    <p>
                        <a href={data.strImageSource} target="_blank" rel="noopener noreferrer">
                            Image source
                        </a>
                    </p>
            }

            <h2>Ingredients</h2>
            <ul>
                {strIngredient}
            </ul>

            <MealInstructions instructions={data.strInstructions} source={data.strSource}/>

            <MealYoutube title={data.strMeal} strYoutube={data.strYoutube}/>

            <h2>Comments</h2>
            <MealComments id={own ? data.id : data.idMeal}/>
        </main>
    );
};

MealMain.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    own: PropTypes.bool
};

export default MealMain;