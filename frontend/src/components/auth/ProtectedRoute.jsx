import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    const isCompleteAddressPage =
        location.pathname === '/complete-address';

    const hasRequiredAddress =
        user?.addressLine &&
        user?.city &&
        user?.state &&
        user?.postalCode;

    if (!hasRequiredAddress && !isCompleteAddressPage) {
        return <Navigate to="/complete-address" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;