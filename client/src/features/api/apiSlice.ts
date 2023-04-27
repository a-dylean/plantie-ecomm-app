import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { CartItem, Order, Product, User } from "../../app/interfaces";

const baseUrl = "http://localhost:4001/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

export const apiSlice = createApi({
  // reducerPath: "api",
  baseQuery,
  tagTypes: ["Products", "ProductOrders", "Orders", "Users"],
  endpoints: (builder) => ({
    //USERS
    createNewUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUserDetails: builder.query<User, void>({
      query: () => "me",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    //PRODUCTS
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id } as const)),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    //CART AND ORDERS
    createOrder: builder.mutation<Order, Partial<Order>>({
      query(body) {
        return {
          url: "orders",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getUserCart: builder.query<CartItem[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const userResponse = await fetchWithBQ("me");
        if (userResponse.error)
          return { error: userResponse.error as FetchBaseQueryError };
        const user = userResponse.data as User;
        const orderResponse = await fetchWithBQ(`orders/draft/${user.id}`);
        if (orderResponse.error)
          return { error: orderResponse.error as FetchBaseQueryError };
        const order = orderResponse.data as Order;
        const cart = await fetchWithBQ(`orders/${order.id}/product_orders`);
        return cart.data
          ? { data: cart.data as CartItem[] }
          : { error: cart.error as FetchBaseQueryError };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: "ProductOrders", id } as const)
              ),
              { type: "ProductOrders", id: "LIST" },
            ]
          : [{ type: "ProductOrders", id: "LIST" }],
    }),
    getUserOrder: builder.query<Order, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const userResponse = await fetchWithBQ("me");
        if (userResponse.error)
          return { error: userResponse.error as FetchBaseQueryError };
        const user = userResponse.data as User;
        const order = await fetchWithBQ(`orders/draft/${user.id}`);
        return order.data
          ? { data: order.data as Order }
          : { error: order.error as FetchBaseQueryError };
      },
      providesTags: (result, error, id) => [{ type: "Orders", id: "LIST" }],
    }),
    pay: builder.mutation<Order, number>({
      query: (orderId) => ({
        url: `orders/pay/${orderId}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
    getDraftOrder: builder.query<Order, number>({
      query: (userId) => `orders/draft/${userId}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
    getProductOrderByOrderId: builder.query<CartItem, number>({
      query: (orderId) => `orders/${orderId}/product_orders`,
      providesTags: (result, error, id) => [{ type: "ProductOrders", id }],
    }),
    getProductOrderByProductId: builder.query<CartItem, number>({
      query: (productId) => `product_orders/${productId}`,
      providesTags: (result, error, id) => [{ type: "ProductOrders", id }],
    }),
    addToCart: builder.mutation<CartItem, Partial<CartItem>>({
      query(body) {
        return {
          url: "product_orders",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "ProductOrders", id: "LIST" }],
    }),
    deleteProductOrder: builder.mutation<CartItem, number | undefined>({
      query: (productOrderId) => ({
        url: `product_orders/${productOrderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "ProductOrders", id }],
    }),
    updateQuantity: builder.mutation<CartItem, Partial<CartItem>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `product_orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "ProductOrders", id },
      ],
    }),
    getUserOrders: builder.query<Order[], number> ({
      query: (userId) => `/orders/${userId}`
    })
  }),
});

export const { useGetCurrentUserDetailsQuery, useGetProductsQuery, useCreateNewUserMutation, useLoginUserMutation, useCreateOrderMutation, useAddToCartMutation, useGetDraftOrderQuery, useDeleteProductOrderMutation, useGetProductOrderByProductIdQuery, useGetProductQuery, useGetUserCartQuery, useGetUserOrderQuery, useUpdateQuantityMutation, usePayMutation, useGetUserOrdersQuery } = apiSlice;
