import React, {memo} from 'react';

type CategoriesPropsType = {
    categoryId: number
    onClickCategory: (id: number) => void
}
type CategoriesType = string[]

export const Categories = memo(({categoryId, onClickCategory}: CategoriesPropsType) => {
    const categories: CategoriesType = [
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
})
