import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";
import usersReducer from "../features/users/usersSlice";

export const store: any = configureStore({
    reducer: {
       products: productsReducer,
       users: usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch