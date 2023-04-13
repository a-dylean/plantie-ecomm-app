import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/interfaces";

type InitialState = {
  users: User[];
  userInfo: User | null;
  userToken: string;
  loading: boolean;
  error: any;
  success: boolean;
};

const initialState: InitialState = {
  users: [],
  userInfo: null,
  userToken: "",
  loading: false,
  error: null,
  success: false,
};

// export const logoutUser = () => {
//   localStorage.removeItem("userToken");
// };

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
