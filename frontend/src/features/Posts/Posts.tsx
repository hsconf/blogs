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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default Posts;