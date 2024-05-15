import CategoriesList from "../components/categories_list/CategoriesList.jsx";
import CountriesList from "../components/countries_list/CountriesList.jsx";
import RandomList from "../components/random_list/RandomList.jsx";

import hero from "../assets/hero.jpg";

import './App.css'

const Home = () => {
    return (
        <>
            <img src={hero} alt="hero" className="hero"/>

            <CategoriesList/>
            <CountriesList/>

            <RandomList items={10}/>
        </>
    );
};

export default Home;
