import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";
import { baseApi } from "../features/api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

export const store: any = configureStore({
    reducer: {
       products: productsReducer,
       [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)