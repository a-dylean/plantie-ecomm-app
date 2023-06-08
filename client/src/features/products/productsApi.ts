import { Product } from '../../app/interfaces';
import { baseApi } from '../api/baseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProducts: build.query<Product[], any>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({ categoryId, sortMethod, priceRange }) =>
        `products?categoryId=${categoryId}&sortMethod=${sortMethod}&priceRange=${priceRange}`,
      providesTags: ['Products'],
    }),
    getProduct: build.query<Product, number>({
      query: (productId) => `products/${productId}`,
      providesTags: ['Products'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
