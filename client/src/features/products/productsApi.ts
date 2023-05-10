import { Product } from "../../app/interfaces";
import { emptySplitApi } from "../api/emptySplitApi";

const productsApi = emptySplitApi.injectEndpoints({
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
