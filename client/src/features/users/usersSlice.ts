import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginModel, UserModel } from "../../app/interfaces";
import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type InitialState = {
    users: UserModel[],
    userInfo: UserModel | null,
    userToken: string,
    loading: boolean,
    error: any,
    success: boolean
}

const initialState: InitialState = {
    users: [],
    userInfo: null,
    userToken: "",
    loading: false,
    error: null,
    success: false
}

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({ 
//         baseUrl: 'http://localhost:4001/',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.userToken
//         if (token) {
//             headers.set('authorization', `Bearer ${token}`)
//             return headers
//         }
//     } }),
//     endpoints: (builder) => ({
//       getUserDetails: builder.query({
//         query: () => ({
//             url: '',
//             method: 'GET'
//         }),
//       }),
//     }),
//   })

export const addUser = createAsyncThunk(
    "users/addUser",
    async (data: UserModel, thunkApi) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            await axios.post("http://localhost:4001/register", {...data, "role": "user"}, config);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return thunkApi.rejectWithValue(error.response.data.message)
            } else {
               return thunkApi.rejectWithValue(error.message) 
            }
            
        }
    }
);

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (parameters: LoginModel, thunkApi) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const { data } = await axios.post("http://localhost:4001/login", parameters, config);

        localStorage.setItem('userToken', data.userToken)
        return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                console.log(error.response.data.details)
                return thunkApi.rejectWithValue(error.response.data.message)
              } else {
                return thunkApi.rejectWithValue(error.message)
              }
        }
    }
)

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(addUser.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(addUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })  
        .addCase(loginUser.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.userToken;
        })
        .addCase(loginUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            ;
        }) 
    }
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;