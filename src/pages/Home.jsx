import React from 'react';

import CategoriesList from '../components/categories_list/CategoriesList';
import CountriesList from '../components/countries_list/CountriesList';
import RandomList from '../components/random_list/RandomList';

import hero from '../assets/hero.jpg';

import './App.css';

function Home() {
  return (
    <>
      <img src={hero} alt="hero" className="hero" />

      <CategoriesList />
      <CountriesList />

      <RandomList items={10} />
    </>
  );
}

export default Home;
