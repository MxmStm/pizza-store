import React, {useCallback, useEffect, useRef} from 'react';
import qs from 'qs';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {selectFilter, setCategoryId, setCurrentPage, setFilters, SortType} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";

export const Home = () => {
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
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

    //если изменили параметры и был первый рендер
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, currentPage, sort.sortProperty])

    //если был первый рендер, то проверяем URL параметры и
    //сохраняем в redux
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
    //         const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
    //
    //         dispatch(setFilters({
    //             ...params,
    //             sort,
    //         }))
    //
    //         isSearch.current = true
    //     }
    // }, [])

    //если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
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
