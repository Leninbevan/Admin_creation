import { BrowserRouter as Router, Switch } from "react-router-dom";
import Privaterouter from "./private";
import Publicrouter from "./public";
import { useSelector } from "react-redux";
import React from "react";


export const Routerpage = () => {
    const authentication = JSON.parse(localStorage.getItem('auth'))
    const state = useSelector((state) => state.is_login);
    // console.log("islogin", state);
    // console.log("authentication", typeof authentication);
    return (
        <>
            {authentication ? <Privaterouter /> : <Publicrouter />}
        </>
    )
}