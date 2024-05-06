import PropTypes from "prop-types";
import {useContext} from "react";
import {UserContext} from "../../contexts.js";
import SVG from 'react-inlinesvg';

import "./MealMain.css";

import MealYoutube from "../meal_youtube/MealYoutube.jsx";
import MealInstructions from "../meal_instructions/MealInstructions.jsx";
import MealComments from "../meal_comments/MealComments.jsx";

import heart from "../../assets/heart.svg";

const MealMain = ({data, id, own = false}) => {
    const {user, setUser} = useContext(UserContext);

    // const onLikeClick = () => {
    //     let liked_posts;

    //     if (user.liked_posts.includes(id)) {
    //         liked_posts = user.liked_posts.filter((item) => item !== id);
    //         setUser({...user, liked_posts});
    //     } else {
    //         liked_posts = [...user.liked_posts, id];
    //         setUser({...user, liked_posts});
    //     }

    //     localStorage.setItem("user", JSON.stringify({...user, liked_posts}));

    //     // save to the server
    //     fetch('http://localhost:3001/users/' + user.id, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({liked_posts})
    //     });
    // }

    const onLikeClick = () => {
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
        fetch('http://localhost:3001/users/' + user.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({liked_posts})
        });
    }


    // console.log(data.strIngredient.split("\n"));

    const strIngredient = own ?
        data.strIngredient.split("\n")
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

                {/* {user && (
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
                )} */}

                {user && user.liked_posts && (
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
                )}

            </h1>

            {data.strMealThumb &&
                <img src={data.strMealThumb} alt={data.strMeal} className="meal__main-image"/>}

            {data.strImageSource && (
                <p>
                    <a href={data.strImageSource} target="_blank" rel="noopener noreferrer">
                        Image source
                    </a>
                </p>
            )}

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
}

MealMain.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    own: PropTypes.bool
};

export default MealMain;