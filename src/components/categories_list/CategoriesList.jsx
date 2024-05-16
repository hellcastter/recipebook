import React, { useContext } from 'react';
import useSWR from 'swr';

import CategoryItem from '../catergory_item/CategoryItem';

import { ApiContext } from '../../contexts';

import './CategoriesList.css';

function CategoriesList() {
  const api = useContext(ApiContext);

  const { data = [], error, isLoading } = useSWR('categories', async () => (
    api
      .getCategories()
      .then(({ categories }) => (
        categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory))
      ))
  ), { revalidateOnFocus: false });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  return (
    <div className="categories">
      <h2 className="categories-title">Categories</h2>
      <ul className="categories-list">
        {
          data.map(({ idCategory, strCategory: name, strCategoryThumb: thumb }) => (
            <CategoryItem key={idCategory} name={name} thumb={thumb} />
          ))
        }
      </ul>
    </div>
  );
}

export default CategoriesList;
