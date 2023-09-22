import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../app/interfaces";
import { api } from "../../helpers/axios";

export const getUserCart = createAsyncThunk(
    "cart/getUserCart",
    async () => {
        try {
            const userResponse = await api.get(
              `/me`,
            );
            if (userResponse.data.error) {
                console.error("rejected", userResponse.data.error)
            }
            const orderResponse = await api(`orders/draft/${userResponse.data.id}`);
        if (orderResponse.data.error) {
            console.error("rejected", orderResponse.data.error)
        }
        const cart = await api(`orders/${orderResponse.data.id}/product-orders`);
        return cart.data
          } catch (error) {
            console.error("rejected", error);
          }
    }
)
const initialState: CartState = {
    cartItems: [],
    isLoading: false,
        isSuccess: false,
        error: "",
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(
            getUserCart.fulfilled,
            (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.cartItems = action.payload;
            }
          );
          builder.addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.error = action.error.message;
          });
    }
})

export default cartSlice.reducer;