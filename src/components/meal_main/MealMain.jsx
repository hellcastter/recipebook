import PropTypes from "prop-types";

import "./MealMain.css";

import MealYoutube from "../meal_youtube/MealYoutube.jsx";
import MealInstructions from "../meal_instructions/MealInstructions.jsx";
import MealComments from "../meal_comments/MealComments.jsx";

const MealMain = ({data}) => {
    return (
        <main className="meal__main">
            <h1>{data.strMeal}</h1>
            <img src={data.strMealThumb} alt={data.strMeal} className="meal__main-image" />
            {data.strImageSource && (
                <p>
                    <a href={data.strImageSource} target="_blank" rel="noopener noreferrer">
                        Image source
                    </a>
                </p>
            )}

            <h2>Ingredients</h2>
            <ul>
                {
                    Object.entries(data)
                    .filter(([key, value]) => key.startsWith("strIngredient") && value)
                    .map(([key, value]) => (
                        <li key={key}>
                            {value} - {data[`strMeasure${key.slice(13)}`]}
                        </li>
                    ))
                }
            </ul>

            <MealInstructions instructions={data.strInstructions} source={data.strSource} />

            <MealYoutube title={data.strMeal} videoId={data.strYoutube} />

            <h2>Comments</h2>

            <MealComments id={data.idMeal} />
        </main>
    );
}

MealMain.propTypes = {
    data: PropTypes.object.isRequired
};

export default MealMain;