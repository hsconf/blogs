import Layout from "./layout.tsx";
import Posts from "./features/Posts/Posts.tsx";
import {Route, Routes} from "react-router-dom";
import Signup from "./features/Auth/Signup/Signup.tsx";
import Login from "./features/Auth/Login/Login.tsx";
import NewPost from "./features/NewPost/NewPost.tsx";

const App = () => {
    return <>
        <Layout>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/post/:id/edit" element={<NewPost />} />
            </Routes>
        </Layout>
    </>
};

export default App
