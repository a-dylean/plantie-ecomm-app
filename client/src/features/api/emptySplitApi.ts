import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const emptySplitApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  refetchOnFocus: true,
  tagTypes: ["Products", "ProductOrders", "Orders", "Users"],
})