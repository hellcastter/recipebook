import 'react';

import './CategoryItem.css'

function CategoryItem({name, thumb}) {
    return (
        <li className="category-item" style={{backgroundImage: `url(${thumb})`}}>
            <span>#{name}</span>
        </li>
    );
}

export default CategoryItem;