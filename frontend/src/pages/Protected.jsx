
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Protected = (props) =>{
    const navigator = useNavigate();
    const {Components} = props;

    useEffect(()=>{
        let login = window.localStorage.getItem("token");
        if(!login){
            console.log("chla ja bsdk")
            navigator("/signin");
        }
    },[])

    return (
        <>
        <Components/>
        </>
    )
}