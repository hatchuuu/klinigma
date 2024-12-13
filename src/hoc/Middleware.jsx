import React from 'react'
import { Navigate } from 'react-router-dom'

const Middleware = ({ children, role }) => {
    if (role === "user") {
        return children
    } else {
        return (
            <Navigate to="/login" />
        )
    }
}

export default Middleware