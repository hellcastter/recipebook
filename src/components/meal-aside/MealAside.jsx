import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import DishItem from "../dish_item/DishItem.jsx";

const MealAside = ({data, randomMeal, randomIsLoading, own = false}) => {
    return (
        <aside className="meal__aside">
            <h3>Tags</h3>

            <div className="meal__tags">
                {
                    !own &&
                    <>
                        <Link className="meal__tag" to={`/category/${data.strCategory}`}>#{data.strCategory}</Link>
                        <Link className="meal__tag" to={`/country/${data.strArea}`}>#{data.strArea}</Link>
                    </>
                }

                {
                    data.strTags &&
                        data.strTags
                            .split(",")
                            .filter((elem) => elem)
                            .map((tag) => (
                                <span key={tag} className="meal__tag">
                                    #{tag.trim()}
                                </span>
                            ))
                }
            </div>

            <h3>Random Meal</h3>
            {
                randomIsLoading ?
                    <div>Loading...</div> :
                    <DishItem id={randomMeal.idMeal} name={randomMeal.strMeal} thumb={randomMeal.strMealThumb}/>
            }
        </aside>
    );
};

MealAside.propTypes = {
    data: PropTypes.object.isRequired,
    randomMeal: PropTypes.object,
    randomIsLoading: PropTypes.bool.isRequired,
    own: PropTypes.bool
};

export default MealAside;