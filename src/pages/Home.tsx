import React, {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {selectFilter, setCategoryId, setCurrentPage} from "../redux/filter/filterSlice";
import {selectPizzaData} from "../redux/pizza/pizzaSlice";
import {useAppDispatch} from "../redux/store";
import {fetchPizzas} from "../redux/pizza/asyncActions";

export const Home = () => {
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {pizzas, status} = useSelector(selectPizzaData)
    const dispatch = useAppDispatch()

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])
    const onClickPage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    const getPizzas = () => {
        const sortBy = sort.sortProperty
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        dispatch(fetchPizzas({
            category,
            search,
            sortBy,
            currentPage: String(currentPage)
        }))

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, currentPage, searchValue])

    const pizzasList = pizzas.map((pizza: any) =>
        <PizzaBlock key={pizza.id} {...pizza}/>)
    const skeletons = [...new Array(8)].map((_, index) =>
        <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort valueSort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className={"content__error-info"}>
                    <h2>Произошла ошибка 😕</h2>
                    <p>Попробуйте повторить попытку позже.</p>
                </div>
            ) : (<div className="content__items">
                {status === 'loading' ? skeletons : pizzasList}
            </div>)
            }
            <Pagination currentPage={currentPage} onClickPage={onClickPage}/>
        </div>
    );
};
