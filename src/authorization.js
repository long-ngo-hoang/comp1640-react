import React from 'react';
import jwt_decode from "jwt-decode";
import {  useLocation, Navigate, Outlet} from 'react-router-dom';
import { selectToken } from './redux/loginSlice';
import { useSelector } from 'react-redux';


const RequireAuth = ({allowedRoles}) => {
    const token = useSelector(selectToken)
    const token1 = localStorage.getItem('token')
    const location = useLocation()
    
    // let url = "";
    // if(token !== undefined){
     const decodedToken = jwt_decode(token);    
    // let url = ""
    // if (decodedToken.Roles == "Administrator"){
    //     // url =(`/departments/view`)
    //     console.log("a")
    //     return <Navigate replace to="/departments/view"/>
    // }
    // else if (allowedRoles === "Quality Assurance Manager"){
    //     // url = "/category/view"
    //     return <Navigate  to="/category/view"/>
    // }
    // else if(decodedToken.Roles === "Quality Assurance Coordinator"){
    //     url = "/idea/view"
    // }
    // else if (decodedToken.Roles === "Staff"){
    //     url = "/idea/create"
    // }

    // if(decodedToken?.Roles == allowedRoles)
    // {
    //     console.log("a")
        
    // }else{
    //     console.log("b")
    // }

    return(
        decodedToken.Roles === allowedRoles
        ?<Outlet/>
        : token
            ?<Navigate to="/" state={{ from: location }} replace />
            :<Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth