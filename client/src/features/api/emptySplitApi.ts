import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { securelyGetAccessToken } from '../../helpers/refreshToken';

const baseUrl = "http://localhost:4001/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const token = await securelyGetAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
  credentials: "include"
});

export const emptySplitApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Products", "ProductOrders", "Orders", "Users"],
})