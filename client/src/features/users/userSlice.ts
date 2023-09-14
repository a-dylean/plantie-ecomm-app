import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, securelyGetAccessToken } from '../../helpers/refreshToken';
import { Login, UserState } from '../../app/interfaces';
import { FieldValues } from 'react-hook-form';
import { isApiResponse } from '../../helpers/errors';
import { enqueueSnackbar } from 'notistack';

export const getCurrentUserDetails = createAsyncThunk(
  'user/getCurrentUserDetails',
  async () => {
    try {
      const token = await securelyGetAccessToken();
      const res = await api.get('me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error('rejected', error);
    }
  },
);

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async () => {
    try {
      const res = await api.post('session/start');
      return res.data;
    } catch (error) {
      console.error('rejected', error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: FieldValues, thunkApi) => {
    try {
      const res = await api.post('session/authenticate',
        data);
        localStorage.setItem('accessToken', res.data.token)
      //return res.data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            console.log(error.response.data.details)
            return thunkApi.rejectWithValue(error.response.data.message)
          } else {
            return thunkApi.rejectWithValue(error.message)
          }
    }
  },
);

const initialState: UserState = {
  user: {
    fullProfile: false,
    name: '',
    email: '',
    surname: '',
    address: '',
    phone: '',
    id: 0,
    accessToken: '',
    refreshToken: '',
  },
  isLoading: false,
  isSuccess: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getCurrentUserDetails.pending, state => {
      state.isLoading = true;
    })
    .addCase(getCurrentUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(getCurrentUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {
        fullProfile: false,
        name: '',
        email: '',
        surname: '',
        address: '',
        phone: '',
        id: 0,
        accessToken: '',
        refreshToken: '',
      };
      state.error = action.error.message;
    })
    .addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loginUser.pending, state => {
        state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        console.log(payload)
        //state.user = payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        ;
    }) 
  },
});

export default userSlice.reducer;
