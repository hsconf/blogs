import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPost, PostMutation, Posts} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchPosts = createAsyncThunk<Posts[], void>('posts/posts-fetching', async () => {
    try {
        const response = await axiosApi.get('/posts');
        return response.data;
    } catch (e) {
        console.log(e)
    }
});

export const createPost = createAsyncThunk<void, PostMutation>('posts/creating', async (post) => {
    try {
        if (!localStorage.getItem('token')) {
            console.error('Token not found!')
        }

        await axiosApi.post('/posts', post, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        });

    } catch (e) {
        console.log(e)
    }
})

export const editPost = createAsyncThunk<void, IPost>('posts/editing', async (post) => {
    try {
        if (!localStorage.getItem('token')) {
            console.error('Token not found!')
        }

        await axiosApi.put('/posts/' + post.id, {message: post.message, media: post.media}, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        });

    } catch (e) {
        console.log(e)
    }
})

export const deletePost = createAsyncThunk<void, string>('posts/deleting', async (id) => {
    try {
        if (!localStorage.getItem('token')) {
            console.error('Token not found!')
        }

        await axiosApi.delete('/posts/' + id, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        });

    } catch (e) {
        console.log(e)
    }
})