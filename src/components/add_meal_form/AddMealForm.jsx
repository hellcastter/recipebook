import {useContext, useState} from "react";

import "./AddMealForm.css";
import {UserContext} from "../../contexts.js";
import {useNavigate} from "react-router-dom";

import {useDropzone} from "react-dropzone";
import CreatableSelect from 'react-select/creatable';

const cloudName = 'drqncpx7b';
const unsignedUploadPreset = 'ml_default';

const AddMealForm = () => {
    const {user} = useContext(UserContext);
    const userNavigate = useNavigate();

    const {acceptedFiles,
        getRootProps,
        getInputProps} = useDropzone({
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
        maxSize: 5000000,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];

        //     upload to cloudinary
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
            const fd = new FormData();
            fd.append('upload_preset', unsignedUploadPreset);
            fd.append('file', file);

            fetch(url, {
                method: 'POST',
                body: fd,
            })
                .then((response) => response.json())
                .then((data) => {
                    // File uploaded successfully
                    const strMealThumb = data.secure_url;
                    setForm((prevForm) => ({...prevForm, strMealThumb}));
                })
                .catch((error) => {
                    console.error('Error uploading the file:', error);
                });
        }
    })

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

    const onTagsChange = (newValue, actionMeta) => {
        const strTags = newValue.map((option) => option.value).join(',');
        console.log(strTags);
        setForm((prevForm) => ({...prevForm, strTags}));
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
            <div {...getRootProps({className: 'add-meal__dropzone'})}>
                <input {...getInputProps({
                    multiple: false,
                    id: "strMealThumb",
                    name: "strMealThumb"
                })} />
                <p>Drag & drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>

            <ul>
                {acceptedFiles.map(file => (
                    <li key={file.path}>
                        {file.path} - {file.size} bytes
                    </li>
                ))}
            </ul>

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

            <CreatableSelect
                className="add-meal__tags"
                isClearable
                isMulti
                placeholder="Select tags"
                id="strTags"
                onChange={onTagsChange}
                name="strTags"

            />

            <label htmlFor="youtube">YouTube</label>
            <input
                type="url"
                id="strYoutube"
                name="strYoutube"
                value={form.strYoutube}
                onChange={onFormChange}
                placeholder="https://www.youtube.com/watch?v=..."/>

            <label htmlFor="source">Source</label>
            <input
                type="url"
                id="strSource"
                name="strSource"
                value={form.strSource}
                onChange={onFormChange}
                placeholder="https://example.com"/>


            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddMealForm;
