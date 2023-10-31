import React, { useContext, useEffect } from 'react'


import { useLocation,Outlet,Navigate } from "react-router-dom"
import AuthContext from '../contexts/AuthContext';



const RequireAuth = () => {
    const location = useLocation();
    const authContext = useContext(AuthContext)
    const isAuthenticated = authContext.isAuthenticated

    return (isAuthenticated ?
        <Outlet></Outlet>
        :
        <Navigate to="/" state={{from: location}} replace></Navigate>
        )

    
}
export default RequireAuth
