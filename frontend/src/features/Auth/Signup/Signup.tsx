import {TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "../../../types.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {register} from "../userThunk.ts";

const Signup = () => {
    const dispatch = useAppDispatch();
    const {error, user} = useAppSelector(state => state.users);
    const navigate = useNavigate();
    const [userReg, setUserReg] = useState<User>({
        name: "",
        password: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserReg(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(userReg));
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user])

    return (
        <div className="min-h-[85vh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-10 bg-amber-100 rounded-lg shadow-lg">
                <TextField
                    id="outlined-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    error={Boolean(error)}
                    onChange={onChange}
                    required
                    value={userReg.name} />
                <TextField
                    id="outlined-password"
                    label="Password" type="password"
                    variant="outlined"
                    name="password"
                    onChange={onChange}
                    required
                    value={userReg.password} />
                <button type="submit" className="py-2 px-5 border-2 border-black rounded-full text-lg hover:border-sky-500 hover:text-sky-500 transition duration-300">
                    Sign up
                </button>
                <p className="">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 hover:underline ml-1">Log in!</Link>
                </p>
            </form>
        </div>

    );
};

export default Signup;