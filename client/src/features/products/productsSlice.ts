import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState } from "../../app/interfaces";
import { api } from "../../helpers/refreshToken";


export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await api.get(
        `/products`,
      );
      return res.data;
    } catch (error) {
      console.error("rejected", error);
    }
  }
);

const initialState: ProductsState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    error: ""
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      }
    );
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
