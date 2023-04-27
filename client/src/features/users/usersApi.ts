import { User } from "../../app/interfaces";
import { emptySplitApi } from "../api/emptySplitApi";

const usersApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUserDetails: builder.query<User, void>({
      query: () => "me",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateNewUserMutation, useLoginUserMutation, useGetCurrentUserDetailsQuery } = usersApi;