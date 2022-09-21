import React from 'react';
import PropTypes from 'prop-types';

export const ModalEdit = ({ showEdit, setShowEdit, children }) => {
    return <>{showEdit ? <div> {children} </div> : null}</>;
};

ModalEdit.propTypes = {
    showEdit: PropTypes.bool,
    setShowEdit: PropTypes.func,
    children: PropTypes.node,
};
