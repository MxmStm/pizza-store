import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootStateType} from "../store";
import {fetchPizzas} from "./asyncActions";

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
