import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from "axios"

interface productState {
    productId: number,
    product: {
        id: number;
        name: string;
        image: string;
        description: string;
        regularPrice: string;
        salePrice: string;
        collection: {
            id: number;
            name: string;
        };
        variants: {
            id: number;
            title: string;
            value: string[];
            price: number[];
        }[];
    }
    variantInfo:{
        id: number[];
        index: number[];
    },
    productPrice: number,
    quantity: number,
}


const initialProduct: productState[] = []

export const productSlide = createSlice({
    name: 'product',
    initialState: initialProduct,
    reducers:{
        addProduct: (state, action: PayloadAction<productState>) =>{
            return [...state, action.payload]
        },
        increaseQuantity: (state, action: PayloadAction<{id: number}>) =>{
            let newState =  state.map((item) => (item.productId === action.payload.id) ? {...item, quantity: item.quantity + 1 } : {...item})
            return [...newState]
        },
        decreaseQuantity: (state, action: PayloadAction<{id: number}>) =>{
            let newState =  state.map((item) => (item.productId === action.payload.id) ? {...item, quantity: item.quantity - 1 } : {...item})
            return [...newState]
        },
        deleteProduct:(state, action: PayloadAction<{id: number}>) =>{
            let newState = state.filter((item) => (item.productId !== action.payload.id))
            return [...newState]
        },
        clearProduct: (state, action) =>{
            return []
        }
    }
})

export const selectorProduct = (state: RootState) => state.product

export const { addProduct, decreaseQuantity, increaseQuantity, deleteProduct, clearProduct } = productSlide.actions

export default productSlide.reducer
