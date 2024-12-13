import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Middleware = ({ children, role }) => {
    // const token = localStorage.getItem("token")
    // const { pathname } = useLocation()
    // if (!token) {
    //     return <Navigate to="/login" />
    // }
    // else if (pathname == "/login") {
    //     return <Navigate to="/dashboard" />
    // }
    // const { role: jwtRole } = jwtDecode(token)

    // if (jwtRole == "superAdmin") {
    //     return children
    // } else if (jwtRole !== "admin") {
    //     if (role !== "superAdmin") {
    //         return children
    //     }
    //     return <Navigate to={pathname} />
    // } else {
    //     return children
    // }
    return children
}

export default Middleware