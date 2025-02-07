import PostCard from "./components/PostCard.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchPosts} from "./postsThunk.ts";

const Posts = () => {
    const dispatch = useAppDispatch();
    const {posts} = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, posts.length]);

    return (
        <div className="xl: px-8">
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default Posts;
