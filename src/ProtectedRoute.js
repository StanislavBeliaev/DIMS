import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRoute({ isLoggedin }) {
    return isLoggedin ? <Outlet /> : <Navigate to='/Login' />;
}

ProtectedRoute.propTypes = {
    isLoggedin: PropTypes.bool,
};
