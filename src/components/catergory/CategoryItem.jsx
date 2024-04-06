import 'react';

function CategoryItem({strCategory, strCategoryThumb}) {
    return (
        <li className="category-item">
            {strCategory}
            {strCategoryThumb && <img src={strCategoryThumb} alt={strCategory}/> }
        </li>
    );
}

export default CategoryItem;