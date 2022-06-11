import React, {useCallback, useEffect, useRef, useState} from 'react';
import qs from 'qs';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {setCategoryId, setCurrentPage, setFilters, setSort} from "../redux/slices/filterSlice";

export const Home = ({searchValue}) => {
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sort, currentPage} = useSelector(state =>
        state.filter)
    const dispatch = useDispatch()


    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onClickCategory = useCallback((id) => {
        dispatch(setCategoryId(id))
    }, [])
    const onClickSort = (id) => {
        dispatch(setSort(id))
    }
    const onClickPage = (page) => {
        dispatch(setCurrentPage(page))
    }
    const fetchPizzas = () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        axios.get(
            `https://62892e0a7af826e39e69750f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sort.sortProperty}&${search}`)
            .then(res => {
                setIsLoading(false)
                setPizzas(res.data)
            })
    }


    //если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, currentPage, sort.sortProperty])

    //если был первый рендер, то проверяем URL параметры и
    //сохраняем в redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({...params, sort}))
            isSearch.current = true
        }
    }, [])

    //если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scroll(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, currentPage, searchValue])

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
