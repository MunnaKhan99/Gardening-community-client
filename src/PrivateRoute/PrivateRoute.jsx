import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { authContext } from '../Layout/RootLayout';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const { pathname } = useLocation();
    console.log(pathname);
    console.log(user);
    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate state={{ form: location.pathname }} to='/login'></Navigate >
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;