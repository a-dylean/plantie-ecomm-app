import { SatelliteAlt } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { CartItemModel, ProductModel } from "../../app/interfaces";

type InitialState = {
    cart: ProductModel[],

}

const initialState: InitialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, {payload}) => {
            const isItemInCart = state.cart.find((item) => item.id === payload.id);
            if (isItemInCart) {
                state.cart = state.cart.map((item) => item.id === payload.id ? {...item, quantity: item.quantity + 1} : item)
            } else {
               state.cart = [...state.cart, { ...payload, quantity: 1}] 
            }  
        },
        removeCartItem: (state, {payload}) => {
        }
    }
})

export const {addCartItem, removeCartItem} = cartSlice.actions;

export default cartSlice.reducer;