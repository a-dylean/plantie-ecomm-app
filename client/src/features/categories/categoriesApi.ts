import { Category } from '../../app/interfaces';
import { baseApi } from '../api/baseApi';

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => `categories`,
      providesTags: ['Categories'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApi;
