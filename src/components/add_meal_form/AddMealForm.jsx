import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import CreatableSelect from 'react-select/creatable';

import { UserContext } from '../../contexts';

import './AddMealForm.css';

const cloudName = 'drqncpx7b';
const unsignedUploadPreset = 'ml_default';

function AddMealForm() {
  const { user } = useContext(UserContext);
  const userNavigate = useNavigate();

  const [form, setForm] = useState({
    strMeal: '',
    strMealThumb: '',
    strIngredient: '',
    strInstructions: '',
    strTags: '',
    strYoutube: '',
    strSource: '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
    maxSize: 5000000,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const fd = new FormData();
      fd.append('upload_preset', unsignedUploadPreset);
      fd.append('file', file);

      fetch(url, { method: 'POST', body: fd })
        .then((response) => response.json())
        .then((data) => {
          const strMealThumb = data.secure_url;
          setForm((prevForm) => ({ ...prevForm, strMealThumb }));
        })
        .catch((error) => {
          console.error('Error uploading the file:', error);
        });
    },
  });

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onTagsChange = (newValue) => {
    const strTags = newValue.map((option) => option.value).join(',');
    setForm((prevForm) => ({ ...prevForm, strTags }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author_id: user.id, ...form }),
    })
      .then((response) => response.json())
      .then((data) => {
        userNavigate(`/meal/own/${data.id}`);
      });
  };

  return (
    <form className="add-meal__form" onSubmit={onSubmit}>
      <label htmlFor="strMeal">Recipe Title</label>
      <input
        type="text"
        id="strMeal"
        name="strMeal"
        value={form.strMeal}
        onChange={onFormChange}
        placeholder="Recipe Title"
        required
      />

      <label htmlFor="strMealThumb">Image URL</label>
      <div {...getRootProps({ className: 'add-meal__dropzone' })}>
        <input {...getInputProps({ multiple: false, id: 'strMealThumb', name: 'strMealThumb' })} />
        <p>Drag & drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>

      {
        form.strMealThumb
            && <img src={form.strMealThumb} alt={form.strMeal} className="add-meal__image" />
      }

      <label htmlFor="strIngredient">Ingredients</label>
      <textarea
        id="strIngredient"
        name="strIngredient"
        value={form.strIngredient}
        onChange={onFormChange}
        required
        placeholder="1 cup of flour, 2 eggs, ..."
      />

      <label htmlFor="strInstructions">Instructions</label>
      <textarea
        id="strInstructions"
        name="strInstructions"
        value={form.strInstructions}
        onChange={onFormChange}
        required
        placeholder="Step 1: ..."
      />

      <label htmlFor="strTags">Tags</label>
      <CreatableSelect
        className="add-meal__tags"
        isClearable
        isMulti
        placeholder="Select tags"
        id="strTags"
        onChange={onTagsChange}
        name="strTags"
      />

      <label htmlFor="strYoutube">YouTube</label>
      <input
        type="url"
        id="strYoutube"
        name="strYoutube"
        value={form.strYoutube}
        onChange={onFormChange}
        placeholder="https://www.youtube.com/watch?v=..."
      />

      <label htmlFor="strSource">Source</label>
      <input
        type="url"
        id="strSource"
        name="strSource"
        value={form.strSource}
        onChange={onFormChange}
        placeholder="https://example.com"
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddMealForm;
