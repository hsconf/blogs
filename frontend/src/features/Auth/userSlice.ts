import {ErrorResponse, IUser} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register} from "./userThunk.ts";

export interface UserState {
    user: IUser | null;
    isLoading: boolean;
    error: ErrorResponse | null;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, {payload}: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.user = payload;
            })
            .addCase(register.rejected, (state, {payload}: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = payload || null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, {payload}: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.user = payload;
            })
            .addCase(login.rejected, (state, {payload}: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.error = payload || null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const rootReducer = userSlice.reducer;