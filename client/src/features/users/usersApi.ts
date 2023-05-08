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
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "session/authenticate",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUserDetails: builder.query<User, void>({
      query() {
        return {
          url: "me",
        };
      },
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUserDetails: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: "me",
          method: "PUT",
          body
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
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
