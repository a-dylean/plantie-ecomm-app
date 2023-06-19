import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { securelyGetAccessToken } from '../../helpers/refreshToken';
import { BASE_URL } from '../../appconfig';

const baseUrl = BASE_URL || "http://localhost:4001";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await securelyGetAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
  credentials: 'include',
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Products', 'ProductOrders', 'Orders', 'Users', 'Categories', 'MinPrice', 'MaxPrice'],
});
