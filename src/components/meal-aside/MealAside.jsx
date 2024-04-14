import {Link} from "react-router-dom";
import DishItem from "../dish_item/DishItem.jsx";
import PropTypes from "prop-types";

const MealAside = ({ data, randomMeal, randomIsLoading }) => {
    return (
        <aside className="meal__aside">
            <h3>Tags</h3>

            <div className="meal__tags">
                <Link className="meal__tag" to={`/category/${data.strCategory}`}>#{data.strCategory}</Link>
                <Link className="meal__tag" to={`/country/${data.strArea}`}>#{data.strArea}</Link>

                {
                    data.strTags && data.strTags.split(",").map((tag) => (
                        <span key={tag} className="meal__tag">
                            #{tag.trim()}
                        </span>
                    ))
                }
            </div>

            {/* calories pie */}
            <h3>Calories</h3>

            <div className="meal__calories">
                calories
            </div>

            <h3>Random Meal</h3>
            {
                randomIsLoading ?
                    (<div>Loading...</div>) :
                    (
                        <DishItem id={randomMeal.idMeal} name={randomMeal.strMeal} thumb={randomMeal.strMealThumb}/>
                    )
            }
        </aside>
    )
};

MealAside.propTypes = {
    data: PropTypes.object.isRequired,
    randomMeal: PropTypes.object.isRequired,
    randomIsLoading: PropTypes.bool.isRequired
};

export default MealAside;