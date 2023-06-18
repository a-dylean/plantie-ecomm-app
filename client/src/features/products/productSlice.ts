import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../app/interfaces';

type InitialState = {
  products: Product[];
  selectedProduct: Product | null;
};

const initialState: InitialState = {
  products: [],
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    },
  },
});

export const { selectProduct } = productsSlice.actions;

export default productsSlice.reducer;
