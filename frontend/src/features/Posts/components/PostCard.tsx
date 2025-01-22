import {Posts} from "../../../types.ts";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {Link} from "react-router-dom";
import {deletePost, fetchPosts} from "../postsThunk.ts";

interface IProps {
    post: Posts;
}

const PostCard: React.FC<IProps> = ({post}) => {

    const {user} = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const deleteP = (id: string) => {
        dispatch(deletePost(id))
        dispatch(fetchPosts());
    }

    return (
        <div className="w-auto border-2 border-black rounded-lg p-2 hover:bg-gradient-to-br from-blue-300 via-pink-300 to-green-300 hover:scale-110 hover:z-50 transition-all duration-500">
            <div className="flex items-center justify-between border-b border-b-black mb-2">
                <h6 className="font-medium">{post.name}</h6>
                <span>{dayjs(post.created_at).format('YYYY.MM.DD HH:mm')}</span>
                    {
                        user?.name === post.name ? (
                            <div className="flex items-center gap-1">
                                <Link to={`post/${post.id}/edit`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                         stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </Link>
                                <button onClick={() => deleteP(post.id.toString())}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                         stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </div>
                        ) : null
                    }
            </div>
            {post.media ? <img className="object-contain mb-2" src={post.media} alt={post.name}/> : null}
            <p>{post.message}</p>
        </div>
    );
};

export default PostCard;