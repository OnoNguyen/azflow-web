import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import App from "../App";
import {FreeMind} from "../FreeMind";
import {Login} from "../Login";

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/app" element={<App/>}/>
        <Route path="/freemind" element={<FreeMind/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)