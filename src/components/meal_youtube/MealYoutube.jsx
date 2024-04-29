import PropTypes from "prop-types";

const MealYoutube = ({title, strYoutube}) => {
    if (!strYoutube) return null;

    return (
        <>
            <h2>Video Recipe</h2>
            <iframe
                title={title}
                width="700"
                height="393"
                src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </>
    );
}

MealYoutube.propTypes = {
    title: PropTypes.string.isRequired,
    strYoutube: PropTypes.string
}

export default MealYoutube;