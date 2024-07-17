import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/Context';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AppContext);
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
