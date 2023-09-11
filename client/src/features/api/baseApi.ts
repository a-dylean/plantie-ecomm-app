import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { securelyGetAccessToken } from '../../helpers/refreshToken';
import { BASE_URL } from '../../appconfig';

const baseUrl = BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await securelyGetAccessToken();
    if (!token) {
      document.cookie = 'accessToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.plantie.atonkopiy.com;';
    }
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
