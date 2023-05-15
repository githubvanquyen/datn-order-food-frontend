import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from "axios"

interface authState {
    id: number
    username: string
    accessToken: string
    isAuthenticated: boolean,
    error: {
        status: boolean,
        message: string
    },
    phoneNumber: string
}

interface registerRequest {
    firstName:string
    lastName: string
    email: string
    password: string
    phoneNumber: string
}

interface authRequest {
    emailOrPhoneNumber: string
    password: string
}

interface authResponse {
    success: boolean
    data:{
        id: number
        firstName:string
        lastName: string
        token: string
        phoneNumber: string
    }
    message: string,
    error:{
        field: string,
        message: string
    },
}

const initialAuth: authState = {
    id: 0,
    username: "",
    accessToken: "",
    isAuthenticated: false,
    error: {
        status: false,
        message: ""
    },
    phoneNumber: ""
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
        logout: (state, action) =>{
            return {
                ...state,
                id: 0,
                username: "",
                accessToken: "",
                isAuthenticated: false,
            }
        },
        closeError: (state, action) =>{
            return {
                ...state,
                error:{
                    status: false,
                    message: ""
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.rejected, (state: authState, action) =>{
            state.error = {
                status: true,
                message: "Đăng kí tài khoản thất bại"
            }
        })
        builder.addCase(register.fulfilled, (state: authState, action: PayloadAction<authResponse>) =>{            
            const {firstName, lastName, token, id, phoneNumber } = action.payload.data;
                state.id = id
                state.username = firstName + " " + lastName
                state.isAuthenticated = token ? true : false
                state.accessToken = token
                state.phoneNumber = phoneNumber
        })
        builder.addCase(login.fulfilled, (state: authState, action: PayloadAction<authResponse>) =>{
            const {firstName, lastName, token, id, phoneNumber} = action.payload.data
            state.id = id
            state.username = firstName + " " + lastName
            state.isAuthenticated = token ? true : false
            state.accessToken = token,
            state.phoneNumber = phoneNumber
        })
    }
})

export const selecterLogin = (state: RootState) => state.auth
export const {logout, closeError} = authSlide.actions

export default authSlide.reducer
