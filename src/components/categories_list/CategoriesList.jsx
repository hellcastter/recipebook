import 'react';

import './CategoriesList.css';

import {ApiContext} from "../../contexts.js";

import {useContext, useEffect, useState} from 'react';
import CategoryItem from "../catergory/CategoryItem.jsx";
import Container from "../container/Container.jsx";


function CategoriesList() {
    const api = useContext(ApiContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.getCategories()
            .then(({categories}) => setCategories(categories));
    }, [api]);

    return (
        <Container>
            <ul  className="categories-list">
                {
                    categories.map((category) => (
                        <CategoryItem key={category.idCategory} {...category}/>
                    ))
                }
            </ul>
        </Container>
    );
}

export default CategoriesList;