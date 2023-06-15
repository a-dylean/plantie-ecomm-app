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
    getMinPrice: build.query<number, void> ({
      query: () => `products/cheapest`,
      transformResponse: (product: Product) => {
        return Number(product.price)
      },
      providesTags: ['MinPrice'],
    }),
    getMaxPrice: build.query<number, void> ({
      query: () => `products/highestPrice`,
      transformResponse: (product: Product) => {
        return Number(product.price)
      },
      providesTags: ['MaxPrice'],
    })
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery, useGetMinPriceQuery, useGetMaxPriceQuery } = productsApi;
