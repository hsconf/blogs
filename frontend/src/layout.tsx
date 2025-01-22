import React from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {logout} from "./features/Auth/userThunk.ts";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
    const {user} = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    return (
        <>
         <header className="mb-5">
             <Box sx={{ flexGrow: 1}}>
                 <AppBar position="static">
                     <Toolbar>
                         <Typography variant="h6" fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
                             <NavLink to="/">Blog</NavLink>
                         </Typography>

                         {
                             user ? (
                                 <>
                                 <NavLink to="/new-post" className="mr-2">New post</NavLink>
                                 <button onClick={() => dispatch(logout())} className="hover:text-red-500">Logout</button>
                                 </>
                             ) : (
                                 <>
                                 <NavLink to="/signup" color="inherit">Sign up</NavLink>
                                 <NavLink to="login" className="px-5 py-2 bg-white rounded-full text-black ml-2">Log in</NavLink>
                                 </>
                             )
                         }

                     </Toolbar>
                 </AppBar>
             </Box>
         </header>
         <main>
             {children}
         </main>
        </>
    );
};

export default Layout;