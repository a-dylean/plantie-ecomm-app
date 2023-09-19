// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { api, securelyGetAccessToken } from '../../helpers/refreshToken';

// export const getCurrentUserDetails = createAsyncThunk(
//   'orders/createOrder',
//   async () => {
//     try {
//       const res = await api.post('orders', {
//       });
//       return res.data;
//     } catch (error) {
//       console.error('rejected', error);
//     }
//   },
// );

// const initialState: OrdersState = {
//   orders: [],
//   cart: [],
//   cartItems: [],
//   isLoading: false,
//   isSuccess: false,
//   error: '',
// };

// export const ordersSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//     .addCase(loginUser.pending, state => {
//         state.isLoading = true;
//     })
//     .addCase(loginUser.fulfilled, (state, {payload}) => {
//         state.isLoading = false;
//         //state.user = payload;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//         ;
//     }) 
//   },
// });

// export default ordersSlice.reducer;
export {}