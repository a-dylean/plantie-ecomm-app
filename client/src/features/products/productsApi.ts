import { Product } from '../../app/interfaces';
import { baseApi } from '../api/baseApi';

type Filters = {
  priceRange: number[],
  categoryName?: string,
  sortMethod?: string,
  searchTerm?: string
}
const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], Filters>({
      query: ({ priceRange, categoryName, sortMethod, searchTerm }) => {
        return {
          url: `products`,
          params: { priceRange, categoryName, sortMethod,  searchTerm },
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
