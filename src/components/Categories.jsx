import React from 'react';

export const Categories = ({categoryId, onClickCategory}) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={category}
                        className={categoryId === index ? 'active' : ''}
                        onClick={() => onClickCategory(index)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}
