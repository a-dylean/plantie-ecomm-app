// import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
// import { Order, CartItem, User, CheckoutInfo } from '../../app/interfaces';
// import { baseApi } from '../api/baseApi';

// const ordersApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createOrder: builder.mutation<Order, Partial<Order>>({
//       query(body) {
//         return {
//           url: 'orders',
//           method: 'POST',
//           body,
//         };
//       },
//       invalidatesTags: ['Orders'],
//     }),
//     getUserCart: builder.query<CartItem[], void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         const userResponse = await fetchWithBQ('me');
//         if (userResponse.error)
//           return { error: userResponse.error as FetchBaseQueryError };
//         const user = userResponse.data as User;
//         const orderResponse = await fetchWithBQ(`orders/draft/${user.id}`);
//         if (orderResponse.error)
//           return { error: orderResponse.error as FetchBaseQueryError };
//         const order = orderResponse.data as Order;
//         const cart = await fetchWithBQ(`orders/${order.id}/product-orders`);
//         return cart.data
//           ? { data: cart.data as CartItem[] }
//           : { error: cart.error as FetchBaseQueryError };
//       },
//       providesTags: ['ProductOrders'],
//     }),
//     getUserOrder: builder.query<Order, void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         const userResponse = await fetchWithBQ('me');
//         if (userResponse.error)
//           return { error: userResponse.error as FetchBaseQueryError };
//         const user = userResponse.data as User;
//         const order = await fetchWithBQ(`orders/draft/${user.id}`);
//         return order.data
//           ? { data: order.data as Order }
//           : { error: order.error as FetchBaseQueryError };
//       },
//       providesTags: ['Orders'],
//     }),
//     createCheckoutSession: builder.mutation<Response, CheckoutInfo>({
//       query(body) {
//         return {
//           url: 'stripe/create-checkout-session',
//           method: 'POST',
//           body,
//         };
//       },
//       invalidatesTags: ['ProductOrders', 'Orders'],
//     }),
//     getProductOrderByProductId: builder.query<CartItem, number>({
//       query: (productId) => `/products/${productId}/product-orders`,
//       providesTags: ['ProductOrders'],
//     }),
//     addToCart: builder.mutation<CartItem, Partial<CartItem>>({
//       query(body) {
//         return {
//           url: 'product-orders',
//           method: 'POST',
//           body,
//         };
//       },
//       invalidatesTags: ['ProductOrders'],
//     }),
//     deleteProductOrder: builder.mutation<CartItem, number | undefined>({
//       query: (productOrderId) => ({
//         url: `product-orders/${productOrderId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['ProductOrders'],
//     }),
//     updateQuantity: builder.mutation<CartItem, Partial<CartItem>>({
//       query(data) {
//         const { id, ...body } = data;
//         return {
//           url: `product-orders/${id}`,
//           method: 'PUT',
//           body,
//         };
//       },
//       invalidatesTags: ['ProductOrders'],
//     }),
//     getUserOrders: builder.query<Order[], number | undefined>({
//       query: (userId) => `/orders/${userId}`,
//       providesTags: ['Orders'],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useAddToCartMutation,
//   useCreateOrderMutation,
//   useDeleteProductOrderMutation,
//   useGetProductOrderByProductIdQuery,
//   useGetUserCartQuery,
//   useGetUserOrderQuery,
//   useGetUserOrdersQuery,
//   useUpdateQuantityMutation,
//   useCreateCheckoutSessionMutation,
// } = ordersApi;
export {}