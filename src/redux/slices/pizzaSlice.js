import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {category, search, sort, currentPage} = params
        const res = await axios.get(`https://62892e0a7af826e39e69750f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sort.sortProperty}&${search}`)
        return res.data
    }
)

const initialState = {
    pizzas: [],
    status: 'loading', //loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.pizzas = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.pizzas = []
        },
    },
})


export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
