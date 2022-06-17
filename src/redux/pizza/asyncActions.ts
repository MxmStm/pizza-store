import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaType} from "./pizzaSlice";

export type SearchPizzaParams = {
    category: string
    search: string
    sortBy: string
    currentPage: string
}

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {category, search, sortBy, currentPage} = params
        const res = await axios.get<PizzaType[]>(`https://62892e0a7af826e39e69750f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&${search}`)
        return res.data
    }
)