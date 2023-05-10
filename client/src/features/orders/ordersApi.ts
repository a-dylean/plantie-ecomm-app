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
      invalidatesTags: ["Orders"],
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
      providesTags: ["ProductOrders"],
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
      providesTags: ["Orders", "ProductOrders"],
    }),
    pay: builder.mutation<Order, Partial<Order>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `orders/pay/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getDraftOrder: builder.query<Order, number>({
      query: (userId) => `orders/draft/${userId}`,
      providesTags: ["Orders"],
    }),
    getProductOrderByOrderId: builder.query<CartItem, number>({
      query: (orderId) => `orders/${orderId}/product_orders`,
      providesTags: ["ProductOrders"],
    }),
    getProductOrderByProductId: builder.query<CartItem, number>({
      query: (productId) => `product_orders/${productId}`,
      providesTags: ["ProductOrders"],
    }),
    addToCart: builder.mutation<CartItem, Partial<CartItem>>({
      query(body) {
        return {
          url: "product_orders",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ProductOrders", "Orders"],
    }),
    deleteProductOrder: builder.mutation<CartItem, number | undefined>({
      query: (productOrderId) => ({
        url: `product_orders/${productOrderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductOrders"],
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
      invalidatesTags: ["ProductOrders"],
    }),
    getUserOrders: builder.query<Order[], number>({
      query: (userId) => `/orders/${userId}`,
      providesTags: ["Orders"]
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
  usePayMutation,
  useUpdateQuantityMutation,
} = ordersApi;
