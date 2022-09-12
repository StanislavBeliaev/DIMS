import React from 'react';
import PropTypes from 'prop-types';

export const ModalCreate = ({ showModal, setShowModal, children }) => {
    return <>{showModal ? <div> {children} </div> : null}</>;
};

ModalCreate.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    children: PropTypes.node,
};
