import {useContext, useState} from "react";

import "./AddMealForm.css";
import {UserContext} from "../../contexts.js";
import {useNavigate} from "react-router-dom";

const AddMealForm = () => {
    const {user} = useContext(UserContext);
    const userNavigate = useNavigate();

    const [form, setForm] = useState({
        strMeal: "",
        strMealThumb: "",
        strIngredient: "",
        strInstructions: "",
        strTags: "",
        strYoutube: "",
        strSource: ""
    });

    const onFormChange = (event) => {
        const {name, value} = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // send form data to the server
        fetch('http://localhost:3001/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({author_id: user.id, ...form}),
        })
            .then((response) => response.json())
            .then((data) => {
                userNavigate(`/meal/own/${data.id}`);
            })
    }

    return (
        <form className="add-meal__form" onSubmit={onSubmit}>
            <label htmlFor="title">Recipe Title</label>
            <input
                type="text"
                id="strMeal"
                name="strMeal"
                value={form.strMeal}
                onChange={onFormChange}
                placeholder="Recipe Title"
                required
            />

            <label htmlFor="image">Image url</label>
            <input
                type="url"
                id="strMealThumb"
                name="strMealThumb"
                value={form.strMealThumb}
                onChange={onFormChange}
                placeholder="https://example.com/image.jpg"
            />

            <label htmlFor="description">Ingredients</label>
            <textarea
                id="strIngredient"
                name="strIngredient"
                value={form.strIngredient}
                onChange={onFormChange}
                required
                placeholder="1 cup of flour, 2 eggs, ..."
            />

            <label htmlFor="instructions">Instructions</label>
            <textarea
                id="strInstructions"
                name="strInstructions"
                value={form.strInstructions}
                onChange={onFormChange}
                required
                placeholder="Step 1: ..."
            />

            <label htmlFor="tags">Tags</label>
            <input
                type="text"
                id="strTags"
                name="strTags"
                value={form.strTags}
                onChange={onFormChange}
                placeholder="tag1, tag2, tag3" />

            <label htmlFor="youtube">YouTube</label>
            <input
                type="url"
                id="strYoutube"
                name="strYoutube"
                value={form.strYoutube}
                onChange={onFormChange}
                placeholder="https://www.youtube.com/watch?v=..." />

            <label htmlFor="source">Source</label>
            <input
                type="url"
                id="strSource"
                name="strSource"
                value={form.strSource}
                onChange={onFormChange}
                placeholder="https://example.com" />


            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddMealForm;
