import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootStateType} from "../store";

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

export type PizzaType = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaStateType {
    pizzas: PizzaType[]
    status: Status
}

const initialState: PizzaStateType = {
    pizzas: [],
    status: Status.LOADING,
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
            state.pizzas = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.pizzas = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaType[]>) => {
            state.pizzas = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.pizzas = []
        })
    }
})

export const selectPizzaData = (state: RootStateType) => state.pizza

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
