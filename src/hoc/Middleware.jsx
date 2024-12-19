import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';

const Middleware = ({ children, role }) => {
    const token = sessionStorage.getItem("token")
    const { pathname } = useLocation();
    let jwtRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token)
            jwtRole = decodedToken.role

        } catch (err) {
            console.error("Invalid token:", err)
            sessionStorage.removeItem("token")
        }
    }
    if (!token || !jwtRole) {
        if (pathname !== "/login" && pathname !== "/register") {
            return <Navigate to="/login" />;
        }
        return children;
    }

    if (pathname === "/login" || pathname === "/register") {
        return <Navigate to="/dashboard" />;
    }

    const [isAdmin, polyId] = jwtRole.split("-") // Match role like "admin-0001"

    // SuperAdmin can access any route
    if (jwtRole === "superAdmin") {
        return children;
    }
    console.log({ isAdmin });
    console.log({ jwtRole });
    // Admin can access routes for admin and user
    if (isAdmin == "admin") {
        if (role === "admin" || role === "user") {
            return children;
        }
        return <Navigate to="/dashboard" />;
    }

    // User can only access routes for user
    if (jwtRole === "user") {
        if (role === "user") {
            return children;
        }
        return <Navigate to="/dashboard" />;
    }

    // Default fallback for undefined roles
    return <Navigate to="/dashboard" />;
};

export default Middleware