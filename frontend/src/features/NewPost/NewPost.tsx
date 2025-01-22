import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PostMutation} from "../../types.ts";
import {createPost, editPost} from "../Posts/postsThunk.ts";

const NewPost = () => {
    const {user} = useAppSelector((state) => state.users);
    const {posts} = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState<PostMutation>({
        message: "",
        media: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (id) {
            dispatch(editPost({...post, id}));
            navigate("/");
            return;
        }

        dispatch(createPost(post));
        setPost({
            message: "",
            media: ""
        })
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user])

    useEffect(() => {
        if (id && posts) {
            const findPost = posts.find(post => post.id === parseInt(id));
                if (findPost) {
                    setPost({message: findPost.message, media: findPost.media});
                }
        }
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col w-1/2 gap-2 p-5 bg-yellow-100 text-lg">
                {
                    id ? <h1 className="mx-auto text-2xl font-semibold">Edit post</h1> : <h1 className="mx-auto text-2xl font-semibold">New post</h1>
                }
                <TextField variant="outlined" rows={4} label="Message" name="message" onChange={onChange} value={post.message} />
                <TextField variant="outlined" label="Image" name="media" onChange={onChange} value={post.media} />
                <Button type="submit" variant="outlined">Save</Button>
            </form>
        </div>
    );
};

export default NewPost;