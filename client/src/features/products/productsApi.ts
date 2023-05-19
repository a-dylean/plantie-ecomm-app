import { Product } from "../../app/interfaces";
import { baseApi } from "../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getProduct: build.query<Product, number>({
      query: (productId) => `products/${productId}`,
      providesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
