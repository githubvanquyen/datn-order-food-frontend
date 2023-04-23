import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from "axios"

interface authState {
    username: string
    accessToken: string
    isAuthenticated: boolean,
}

interface registerRequest {
    firstName:string
    lastName: string
    email: string
    password: string
}

interface authRequest {
    email: string
    password: string
}

interface authResponse {
    success: boolean
    data:{
        firstName:string
        lastName: string
        token: string
    }
    message: string
}

const initialAuth: authState = {
    username: "",
    accessToken: "",
    isAuthenticated: false,
}

export const register = createAsyncThunk("login/setRegister", async(data: registerRequest) =>{
    const response = await axios.post<authResponse>("http://localhost:4000/api/user/register",{
        ...data
    })
    return response.data
})

export const login = createAsyncThunk("login/setLogin", async(data: authRequest) =>{
    const response = await axios.post<authResponse>("http://localhost:4000/api/user/login",{
        ...data
    })
    return response.data
})

export const authSlide = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state: authState, action: PayloadAction<authResponse>) =>{            
            const {firstName, lastName, token } = action.payload.data;
            state.username = firstName + lastName
            state.isAuthenticated = token ? true : false
            state.accessToken = token
        })
        builder.addCase(login.fulfilled, (state: authState, action: PayloadAction<authResponse>) =>{
            const {firstName, lastName, token} = action.payload.data
            state.username = firstName + lastName
            state.isAuthenticated = token ? true : false
            state.accessToken = token
        })
    }
})

export const selecterLogin = (state: RootState) => state.auth

export default authSlide.reducer
