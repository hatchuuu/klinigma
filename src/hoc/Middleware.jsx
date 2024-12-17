import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Middleware = ({ children, role }) => {
    const token = localStorage.getItem("token")
    const { pathname } = useLocation();
    let jwtRole = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token)
            jwtRole = decodedToken.role
        } catch (err) {
            console.error("Invalid token:", err)
            localStorage.removeItem("token")
        }
    }

    if (!token || !jwtRole) {
        if (pathname === "/") {
            return children
        }
        if (pathname !== "/login" && pathname !== "/register") {
            return <Navigate to="/" />
        }
        return children
    }

    if (pathname === "/login" || pathname === "/register") {
        return <Navigate to="/dashboard" />;
    }

    if (jwtRole == "superAdmin") {
        return children
    } else if (jwtRole !== "admin") {
        if (role !== "superAdmin") {
            return children
        }
        return <Navigate to={pathname} />
    } else {
        return children
    }
}

export default Middleware