import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { ProductModel } from "../../app/interfaces";
import axios from "axios";

type InitialState = {
    products: ProductModel[],
    loading: boolean
}

const initialState: InitialState = {
    products: [],
    loading: false
}
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const response = await axios.get("http://localhost:4001/products");
        return response?.data;
    }
)
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getProducts.pending, state => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action:PayloadAction<ProductModel[]>) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, state => {
            state.loading = false;
        })  
    }
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;