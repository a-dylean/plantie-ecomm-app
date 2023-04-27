// import { createSlice } from "@reduxjs/toolkit";
// import { CartItemModel, Product } from "../../app/interfaces";

// type InitialState = {
//     cart: CartItemModel[],

// }

// const initialState: InitialState = {
//     cart: [],
// }

// export const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addCartItem: (state, {payload}) => {
//             const isItemInCart = state.cart.find((item) => item.id === payload.id);
//             if (isItemInCart) {
//                 state.cart = state.cart.map((item) => item.id === payload.id ? {...item, quantity: item.quantity + 1} : item)
//             } else {
//                state.cart = [...state.cart, { ...payload, quantity: 1}] 
//             }  
//         },
//         removeCartItemByPiece: (state, {payload}) => {
//             state.cart = state.cart.reduce((acc, item) => {
//                 if (item.id === payload.id) {
//                   if (item.quantity === 1) return acc;
//                   return [...acc, { ...item, quantity: item.quantity - 1 }];
//                 } else {
//                   return [...acc, item];
//                 }
//               }, [] as CartItemModel[])
//         },
//         removeCartItem: (state, {payload}) => {
//             state.cart = state.cart.reduce((acc, item) => {
//                 if (item.id === payload.id) {
//                   return [...acc];
//                 } else {
//                   return [...acc, item];
//                 }
//               }, [] as CartItemModel[])
//         },
//         clearCart: (state) => {
//           state.cart = []
//         }
//     }
// })

// export const {addCartItem, removeCartItemByPiece, removeCartItem, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;
export {}