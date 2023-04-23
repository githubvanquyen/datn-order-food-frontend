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

interface orderState {
    userName: string,
    building: string,
    floor: string,
    room:string,
    methodPayment: string,
}


const initialOrder: orderState = {
    userName: "",
    building: "",
    floor: "",
    room:"",
    methodPayment: "0",
}

interface orderPayload {
    userName?: string,
    building?: string,
    floor?: string,
    room?:string,
    methodPayment?: string,
}

export const orderSlider = createSlice({
    name: 'product',
    initialState: initialOrder,
    reducers:{
        addOrder: (state, action: PayloadAction<orderPayload>) =>{
            return {...state, ...action.payload}
        },
    }
})

export const selectorOrder = (state: RootState) => state.order

export const { addOrder } = orderSlider.actions

export default orderSlider.reducer
