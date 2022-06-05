import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";

export const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('https://62892e0a7af826e39e69750f.mockapi.io/items')
            .then(res => {
                setIsLoading(false)
                setPizzas(res.data)
            })
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)}
            </div>
        </>
    );
};
