import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {setCategoryId, setCurrentPage, setSort} from "../redux/slices/filterSlice";

export const Home = ({searchValue}) => {
    const {categoryId, sort, currentPage} = useSelector(state =>
        state.filter)
    const dispatch = useDispatch()


    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onClickSort = (id) => {
        dispatch(setSort(id))
    }
    const onClickPage = (number) => {
        dispatch(setCurrentPage(number))
    }


    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true)
        axios.get(
            `https://62892e0a7af826e39e69750f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sort.sortProperty}&${search}`)
            .then(res => {
                setIsLoading(false)
                setPizzas(res.data)
            })
        window.scroll(0, 0)
    }, [category, categoryId, search, sort.sortProperty, currentPage])

    const pizzasList = pizzas.map(pizza =>
        <PizzaBlock key={pizza.id} {...pizza}/>)
    const skeletons = [...new Array(4)].map((_, index) =>
        <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort valueSort={sort} onClickSort={onClickSort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzasList}
            </div>
            <Pagination currentPage={currentPage} onClickPage={onClickPage}/>
        </div>
    );
};
