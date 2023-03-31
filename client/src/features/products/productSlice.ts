import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { ProductModel } from "../../app/interfaces";
import axios from "axios";

type InitialState = {
    products: ProductModel[],
    selectedProduct: ProductModel | null,
    loading: boolean
}

const initialState: InitialState = {
    products: [],
    selectedProduct: null,
    loading: false
}
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const response = await axios.get("http://localhost:4001/products");
        console.log(response)
        return response?.data;
    }
)
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        selectProduct: (state, {payload}) => {
            state.selectedProduct = payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getProducts.pending, state => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.products = payload;
        })
        .addCase(getProducts.rejected, state => {
            state.loading = false;
        })  
    }
});

export const {selectProduct} = productsSlice.actions;

export default productsSlice.reducer;