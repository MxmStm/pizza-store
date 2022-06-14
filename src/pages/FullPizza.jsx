import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

export const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const {id} = useParams()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const res = await axios.get('https://62892e0a7af826e39e69750f.mockapi.io/items/' + id)
                setPizza(res.data)
            } catch (error) {
                alert('Ошибка запроса пиццы')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return 'Loading...'
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="Pizza"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} руб.</h4>
        </div>
    );
};
