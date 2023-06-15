import { Filters, Product } from '../../app/interfaces';
import { baseApi } from '../api/baseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], Filters>({
      query: ({ priceRange, categoryName, orderBy, searchTerm }) => {
        return {
          url: `products`,
          params: { priceRange, categoryName, orderBy,  searchTerm },
        };
      },
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
