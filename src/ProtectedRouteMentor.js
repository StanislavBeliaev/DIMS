import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRouteMentor({ isLoggedin, role }) {
    return isLoggedin && role === 'Mentor' ? <Outlet /> : <Navigate to='/Login' />;
}

ProtectedRouteMentor.propTypes = {
    isLoggedin: PropTypes.bool,
    role: PropTypes.string,
};
