import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { Login, LoginResponse, Product, User } from "../../app/interfaces";
import { RootState } from "../../app/store";

const baseUrl = "http://localhost:4001/";

type UserResponse = User;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }},
});

export const apiSlice = createApi({
  // reducerPath: "api",
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    //USERS
    createNewUser: builder.mutation<FieldValues, {}>({
      query: (parameters) => ({
        url: 'register',
        method: 'POST',
        body: parameters
      })
    }),
    loginUser: builder.mutation<LoginResponse, {}>({
      query: (parameters) => ({
        url: 'login',
        method: 'POST',
        body: parameters
      }),
    }),
    getCurrentUserDetails: builder.query<UserResponse, void>({
      query: () => 'me',
    }),
    //PRODUCTS
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getProduct: builder.query<Product, {}> ({
      query: (parameters) => ({
        url: `products/${parameters}`,
        method: 'GET'
      })
    }),
    //CART AND ORDERS
    createOrder: builder.mutation({
      query: (parameters) => ({
        url: 'orders',
        method: 'POST',
        body: parameters
      })
    }),
    addToCart: builder.mutation({
      query: (parameters) => ({
        url: 'orders/product_order',
        method: 'POST',
        body: parameters
      })
    }),
    getDraftOrder: builder.query({
      query: (parameters) => ({
        url: `orders/draft/${parameters}`,
        method: 'GET'
      }),
      providesTags: ['Product'],
    }),
    getProductOrderPerOrder: builder.query({
      query: (parameters) => ({
        url: `orders/product_order/order/${parameters}`,
        method: 'GET'
      }),
      providesTags: ['Product'],
    }),
    getProductOrderByProductId: builder.query({
      query: (productId: number) => ({
        url: `orders/product_order/item/${productId}`,
        method: 'GET'
      }),
      providesTags: ['Product'],
    }),
    deleteProductOrder: builder.mutation({
      query: (parameters) => ({
        url: `orders/product_order/delete/${parameters}`,
        method: 'DELETE'
      })
    }),
    incrementProductOrder: builder.mutation({
      query: (parameters) => ({
        url: `orders/increment/${parameters}`,
        method: 'POST',
      })
    })
  }),
});

export const { useGetCurrentUserDetailsQuery, useGetProductsQuery, useCreateNewUserMutation, useLoginUserMutation, useCreateOrderMutation, useAddToCartMutation, useGetDraftOrderQuery, useGetProductOrderPerOrderQuery, useDeleteProductOrderMutation, useIncrementProductOrderMutation, useGetProductOrderByProductIdQuery, useGetProductQuery } = apiSlice;
