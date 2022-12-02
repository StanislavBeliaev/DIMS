import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRouteMember({ isLoggedin, role }) {
    return isLoggedin && role === 'Member' ? <Outlet /> : <Navigate to='/Login' />;
}

ProtectedRouteMember.propTypes = {
    isLoggedin: PropTypes.bool,
    role: PropTypes.string,
};
