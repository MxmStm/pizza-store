import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootStateType} from "../store";

export type CartItemType = {
    id: string
    title: string
    type: string
    size: number
    price: number
    count: number
    imageUrl: string
}

interface CartStateType {
    totalPrice: number
    products: CartItemType[]
}

const initialState: CartStateType = {
    totalPrice: 0,
    products: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItemType>) => {
            const findProduct = state.products.find(product => product.id === action.payload.id)
            if (findProduct) {
                findProduct.count++
            } else {
                state.products.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.products.reduce((sum, product) =>
                sum + (product.price * product.count), 0
            )
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findProduct = state.products.find(product => product.id === action.payload)
            if (findProduct) {
                findProduct.count--
                state.totalPrice -= findProduct.price
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product =>
                product.id !== action.payload
            )
        },
        clearCart: (state) => {
            state.products = []
            state.totalPrice = 0
        },
    },
})

export const selectCart = (state: RootStateType) => state.cart
export const selectItemCartById = (id: string) => (state: RootStateType) =>
    state.cart.products.find(product => product.id === id)

export const {addProduct, minusItem, removeProduct, clearCart} = cartSlice.actions

export default cartSlice.reducer
