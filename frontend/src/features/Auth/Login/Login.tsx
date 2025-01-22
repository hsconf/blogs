import {TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "../../../types.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {login} from "../userThunk.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const {error, user} = useAppSelector((state) => state.users);
    const navigate = useNavigate();
    const [userReg, setUserReg] = useState<User>({
        name: "",
        password: "",
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserReg(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(userReg))
    }

    const helperText = (value: string): string | undefined => {
        if (typeof error?.message === "string") {
            return error.message;
        } else if (typeof error?.message === "object" && value in error.message) {
            return error.message[value];
        }
        return undefined;
    };

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
                    onChange={onChange}
                    value={userReg.name}
                    error={Boolean(helperText('user'))}
                    helperText={helperText('user')}
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    onChange={onChange}
                    value={userReg.password}
                    error={Boolean(helperText('password'))}
                    helperText={helperText('password')}
                />
                <button type="submit" className="py-2 px-5 border-2 border-black rounded-full text-lg hover:border-sky-500 hover:text-sky-500 transition duration-300">
                    Log in
                </button>
                <p className="">
                    Don’t have an account?
                    <Link to="/signup" className="text-blue-600 hover:underline ml-1">Sign up!</Link>
                </p>
            </form>
        </div>

    );
};

export default Login;