import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { CartItem, Login, LoginResponse, Order, Product, User } from "../../app/interfaces";
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
  tagTypes: ['Product', 'CartItem', 'Order', 'Cart', 'User'],
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
      invalidatesTags: ['User']
    }),
    getCurrentUserDetails: builder.query<UserResponse, void>({
      query: () => 'me',
    }),
    //PRODUCTS
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Product']
    }),
    getProduct: builder.query<Product, {}> ({
      query: (parameters) => ({
        url: `products/${parameters}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),
    //CART AND ORDERS
    createOrder: builder.mutation<Order, {}>({
      query: (parameters) => ({
        url: 'orders',
        method: 'POST',
        body: parameters
      })
    }),
    addToCart: builder.mutation<CartItem, {}>({
      query: (parameters) => ({
        url: 'orders/product_order',
        method: 'POST',
        body: parameters
      }),
      invalidatesTags: ['Cart'],
    }),
    getDraftOrder: builder.query<Order, number>({
      query: (parameters) => ({
        url: `orders/draft/${parameters}`,
        method: 'GET'
      }),
    }),
    // getProductOrderPerOrder: builder.query<CartItem[], number>({
    //   query: (parameters) => ({
    //     url: `orders/product_order/order/${parameters}`,
    //     method: 'GET'
    //   })
    // }),
    getProductOrderByProductId: builder.query<CartItem, {}>({
      query: (productId: number) => ({
        url: `orders/product_order/item/${productId}`,
        method: 'GET'
      }),
      providesTags: ['CartItem']
    }),
    deleteProductOrder: builder.mutation<CartItem, number|undefined>({
      query: (parameters) => ({
        url: `orders/product_order/delete/${parameters}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart'],
    }),
    incrementProductOrder: builder.mutation<CartItem, number|undefined>({
      query: (parameters) => ({
        url: `orders/increment/${parameters}`,
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
    decrementProductOrder: builder.mutation<CartItem, number|undefined>({
      query: (parameters) => ({
        url: `orders/decrement/${parameters}`,
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
    getUserCart: builder.query<CartItem[], {}>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const userResponse = await fetchWithBQ('me')
        if (userResponse.error)
          return { error: userResponse.error as FetchBaseQueryError }
        const user = userResponse.data as User
        const orderResponse = await fetchWithBQ(`orders/draft/${user.id}`)
        if (orderResponse.error)
        return {error: orderResponse.error as FetchBaseQueryError}
        const order = orderResponse.data as Order 
        const cart = await fetchWithBQ(`orders/product_order/order/${order.id}`)
        return cart.data
        ? { data: cart.data as CartItem[] }
        : { error: cart.error as FetchBaseQueryError }
      },
      providesTags: ['Cart']
    }),
    getUserOrder: builder.query<Order, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const userResponse = await fetchWithBQ('me')
        if (userResponse.error)
          return { error: userResponse.error as FetchBaseQueryError }
        const user = userResponse.data as User
        const order = await fetchWithBQ(`orders/draft/${user.id}`)
        return order.data
        ? { data: order.data as Order }
        : { error: order.error as FetchBaseQueryError }
      }
    })
  }),
});

export const { useGetCurrentUserDetailsQuery, useGetProductsQuery, useCreateNewUserMutation, useLoginUserMutation, useCreateOrderMutation, useAddToCartMutation, useGetDraftOrderQuery, useDeleteProductOrderMutation, useIncrementProductOrderMutation, useGetProductOrderByProductIdQuery, useGetProductQuery, useGetUserCartQuery, useGetUserOrderQuery, useDecrementProductOrderMutation } = apiSlice;
