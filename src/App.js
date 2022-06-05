import './scss/app.scss';
import {Header} from "./components/Header";
import {Sort} from "./components/Sort";
import {Categories} from "./components/Categories";
import {PizzaBlock} from "./components/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        axios.get('https://62892e0a7af826e39e69750f.mockapi.io/items')
            .then(res => setPizzas(res.data))
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map(pizza => (
                            <PizzaBlock key={pizza.id} {...pizza}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
