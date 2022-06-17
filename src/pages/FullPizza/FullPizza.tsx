import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import s from './FullPizza.module.scss'

export const FullPizza = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const res = await axios.get('https://62892e0a7af826e39e69750f.mockapi.io/items/' + id)
                setPizza(res.data)
            } catch (error) {
                alert('Ошибка запроса пиццы')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>'Loading...'</>
    }

    return (
        <div className={s.container}>
            <img src={pizza.imageUrl} alt="Pizza"/>
            <h2>{pizza.title}</h2>
            <h4>от {pizza.price} руб.</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};
