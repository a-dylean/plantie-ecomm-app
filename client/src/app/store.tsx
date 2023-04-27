import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";
//import { apiSlice } from "../features/api/apiSlice";
import { emptySplitApi } from "../features/api/emptySplitApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

export const store: any = configureStore({
    reducer: {
       products: productsReducer,
       [emptySplitApi.reducerPath]: emptySplitApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(emptySplitApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)