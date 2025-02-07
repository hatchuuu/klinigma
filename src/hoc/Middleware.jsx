import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '@/store/store';

const Middleware = ({ children, role }) => {
    const token = useAuthStore(state => state.token)
    const { pathname } = useLocation();

    if (!token) {
        if (pathname !== "/login" && pathname !== "/register") {
            return <Navigate to="/login" />
        }
        return children
    }
    else {
        const { role: jwtRole } = jwtDecode(token)
        if (pathname === "/login" || pathname === "/register") {
            return <Navigate to="/dashboard" />;
        }

        const findRoleByRoute = role.includes(jwtRole)
        if (findRoleByRoute) {
            return children
        } else {
            return <Navigate to="/dashboard" />;
        }
    }
};


export default Middleware