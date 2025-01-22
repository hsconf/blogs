import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "../features/Posts/postsSlice.ts";
import {userSlice} from "../features/Auth/userSlice.ts";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: userSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;