import {Posts} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPosts} from "./postsThunk.ts";

export interface PostState {
    posts: Posts[];
    isLoading: boolean;
}

const initialState: PostState = {
    posts: [],
    isLoading: false,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, {payload}: PayloadAction<Posts[]>) => {
                state.isLoading = false;
                state.posts = payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const postsReducer = postsSlice.reducer;