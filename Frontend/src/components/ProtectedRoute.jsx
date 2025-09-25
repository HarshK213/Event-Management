import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  console.log('ProtectedRoute Debug:', { isAuthenticated, user, loading, allowedRoles });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    console.log('Role not allowed, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;