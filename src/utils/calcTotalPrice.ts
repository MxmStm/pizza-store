import {CartItemType} from "../redux/slices/cartSlice";


export const calcTotalPrice = (products: CartItemType[]) => {
    return products.reduce((sum, product) =>
        sum + (product.price * product.count), 0
    )
}
