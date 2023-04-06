import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { LoginModel, LoginResponse, ProductModel, UserModel } from "../../app/interfaces";
import { RootState } from "../../app/store";

const baseUrl = "http://localhost:4001/";

type UserModelResponse = UserModel;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }},
});

export const apiSlice = createApi({
  // reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    createNewUser: builder.mutation<FieldValues, {}>({
      query: (parameters) => ({
        url: 'register',
        method: 'POST',
        body: parameters
      })
    }),
    loginUser: builder.mutation<LoginResponse, {}>({
      query: (parameters) => ({
        url: 'login',
        method: 'POST',
        body: parameters
      }),
    }),
    getCurrentUserDetails: builder.query<UserModelResponse, void>({
      query: () => 'me',
    }),
    getProducts: builder.query<ProductModel[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetCurrentUserDetailsQuery, useGetProductsQuery, useCreateNewUserMutation, useLoginUserMutation } = apiSlice;
