import React from 'react';
import jwt_decode from "jwt-decode";
import {  useLocation, Navigate, Outlet} from 'react-router-dom';

const RequireAuth = ({allowedRoles}) => {
    console.log(allowedRoles)
    const token = localStorage.getItem('token')
    const location = useLocation()
    
     const decodedToken = jwt_decode(token);    

      return(
         decodedToken.Roles == allowedRoles
         ?<Outlet/>
         : token
             ?<Navigate to="/" state={{ from: location }} replace />
             :<Navigate to="/login" state={{ from: location }} replace />
     )
    
}
// : token
//             ?<Navigate to="/" state={{ from: location }} replace />
//             :
export default RequireAuth