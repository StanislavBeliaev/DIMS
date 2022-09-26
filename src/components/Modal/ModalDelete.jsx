import React from 'react';
import PropTypes from 'prop-types';

export const ModalDelete = ({ showDelete, setShowDelete, children }) => {
    return <>{showDelete ? <div> {children} </div> : null}</>;
};

ModalDelete.propTypes = {
    showDelete: PropTypes.bool,
    setShowDelete: PropTypes.func,
    children: PropTypes.node,
};
