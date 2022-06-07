import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";

export const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности', sortProperty: 'rating'
    })

    const category = categoryId > 0 ? `category=${categoryId}` : ''

    useEffect(() => {
        setIsLoading(true)
        axios.get(
            `https://62892e0a7af826e39e69750f.mockapi.io/items?${
                category}&sortBy=${sortType.sortProperty}`)
            .then(res => {
                setIsLoading(false)
                setPizzas(res.data)
            })
        window.scroll(0, 0)
    }, [category, categoryId, sortType.sortProperty])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />
                <Sort
                    value={sortType}
                    onClickSort={(id) => setSortType(id)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map(pizza => <PizzaBlock
                        key={pizza.id} {...pizza}/>)}
            </div>
        </div>
    );
};
