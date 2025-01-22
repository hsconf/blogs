import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorResponse, IUser, User} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<IUser, User, {rejectValue: ErrorResponse}>('user/signup', async (user, {rejectWithValue}) => {
    try {
        const response = await axiosApi.post<IUser>('/users/signup', user)
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (e) {

        if (isAxiosError(e) && e.response && e.response.data) {
            return rejectWithValue(e.response.data);
        }

        return rejectWithValue({success: false, message: "Unknown error"})
    }
});

export const login = createAsyncThunk<IUser, User, {rejectValue: ErrorResponse}>('user/login', async (user, {rejectWithValue}) => {
    try {
        const response = await axiosApi.post<IUser>('/users/login', user)
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (e) {

        if (isAxiosError(e) && e.response && e.response.data) {
            return rejectWithValue(e.response.data);
        }

        return rejectWithValue({success: false, message: "Unknown error"})
    }
});

export const logout = createAsyncThunk('user/logout', async () => {
   try {

       if (!localStorage.getItem('token')) {
           console.error('Token not found!')
       }

       await axiosApi.post('users/logout', {}, {
           headers: {
               'Authorization': localStorage.getItem('token'),
           }
       });
       localStorage.removeItem('token');
   } catch (e) {
       console.log(e);
   }
});
