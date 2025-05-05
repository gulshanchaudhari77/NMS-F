import React, { Children } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const OpenRoute = ({children}) => {
    const isLoggenIn = window.localStorage.getItem("loggedInUser") || null;

   if(isLoggenIn===null)
    {
        return children
    }  else{
        return <Navigate to='/dashboard'/>
    }
}

export default OpenRoute