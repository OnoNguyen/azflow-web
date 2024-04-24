import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import App from "../App";
import {Login} from "../pages/login";
import {SignUp} from "../pages/signup";
import {FreeMind} from "../FreeMind";

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/app" element={<App/>}/>
        <Route path="/freemind" element={<FreeMind/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)