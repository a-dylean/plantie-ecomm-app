import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { Order, CartItem, User } from "../../app/interfaces";
import { emptySplitApi } from "../api/emptySplitApi";

const ordersApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Partial<Order>>({
      query(body) {
        return {
          url: "orders",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Orders"]
      //[{ type: "Orders", id: "LIST" }]
      ,
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
        method: "PUT",
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
    getUserOrders: builder.query<Order[], number>({
      query: (userId) => `/orders/${userId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddToCartMutation,
  useCreateOrderMutation,
  useDeleteProductOrderMutation,
  useGetDraftOrderQuery,
  useGetProductOrderByOrderIdQuery,
  useGetProductOrderByProductIdQuery,
  useGetUserCartQuery,
  useGetUserOrderQuery,
  useGetUserOrdersQuery,
  usePayMutation, useUpdateQuantityMutation
} = ordersApi;
