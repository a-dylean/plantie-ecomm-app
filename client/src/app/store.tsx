import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";
import usersReducer from "../features/users/usersSlice";
import cartReducer from "../features/cart/cartSlice"
import { apiSlice } from "../features/api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

export const store: any = configureStore({
    reducer: {
       //products: productsReducer,
       users: usersReducer,
       cart: cartReducer,
       [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)