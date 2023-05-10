import { User, UserInfo } from "../../app/interfaces";
import { emptySplitApi } from "../api/emptySplitApi";

const usersApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<UserInfo, void> ({
      query() {
        return {
          url: "session/start",
          method: "POST"
        }
      },
      invalidatesTags: ["Users"],
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "session/authenticate",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Users"],
    }),
    getCurrentUserDetails: builder.query<User, void>({
      query() {
        return {
          url: "me",
        };
      },
      providesTags: ["Users"],
    }),
    updateUserDetails: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "me",
          method: "PUT",
          body
        };
      },
      invalidatesTags: ["Users"],
    })
  }),
  overrideExisting: false,
});

export const {
  useCreateNewUserMutation,
  useLoginUserMutation,
  useGetCurrentUserDetailsQuery,
  useUpdateUserDetailsMutation
} = usersApi;
