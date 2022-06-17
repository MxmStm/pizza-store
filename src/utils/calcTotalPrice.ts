import {CartItemType} from "../redux/cart/cartSlice";


export const calcTotalPrice = (products: CartItemType[]) => {
    return products.reduce((sum, product) =>
        sum + (product.price * product.count), 0
    )
}
