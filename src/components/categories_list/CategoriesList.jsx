import 'react';

import './CategoriesList.css';

import {ApiContext} from "../../contexts.js";

import {useContext, useEffect, useState} from 'react';
import CategoryItem from "../catergory_item/CategoryItem.jsx";
import Container from "../container/Container.jsx";


function CategoriesList() {
    const api = useContext(ApiContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.getCategories()
            .then(({categories}) => {
                return setCategories(categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory)));
            });
    }, [api]);

    return (
        <div className="categories">
            <h2 className="categories-title">Categories</h2>
            <ul  className="categories-list">
                {
                    categories.map(({idCategory, strCategory: name, strCategoryThumb: thumb}) => (
                        <CategoryItem key={idCategory} name={name} thumb={thumb} />
                    ))
                }
            </ul>
        </div>
    );
}

export default CategoriesList;