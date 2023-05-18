import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from "axios"

interface discountState {
    id: number
    name: string,
    value: string,
    type: number,
    minimumPrice: string,
    maximumDiscount: string,
    expiredDate: string,
    quantity: number,
}

interface discount {
    id: number
    name: string,
    value: string,
    type: number,
    minimumPrice: string,
    maximumDiscount: string,
    expiredDate: string,
    quantity: number,
}


const initialDiscount: discountState = {
    id: 0,
    name: "",
    value: "",
    type: 0,
    minimumPrice: "",
    maximumDiscount: "",
    expiredDate: "",
    quantity: 0,
}

export const discountSlide = createSlice({
    name: 'discount',
    initialState: initialDiscount,
    reducers:{
        setDiscount: (state, action: PayloadAction<discount>) =>{
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                value: action.payload.value,
                type: action.payload.type,
                minimumPrice: action.payload.minimumPrice,
                maximumDiscount: action.payload.maximumDiscount,
                expiredDate: action.payload.expiredDate,
                quantity: action.payload.quantity,
            }
        }
    },
    
})

export const selecterDiscount = (state: RootState) => state.discount
export const {setDiscount} = discountSlide.actions

export default discountSlide.reducer
