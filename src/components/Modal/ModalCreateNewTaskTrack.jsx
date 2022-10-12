import React from 'react';
import PropTypes from 'prop-types';

export const ModalCreateNewTaskTarack = ({ showCreateNewTaskTrack, setShowCreateNewTaskTrack, children }) => {
    return <>{showCreateNewTaskTrack ? <div>{children}</div> : null}</>;
};
ModalCreateNewTaskTarack.propTypes = {
    showCreateNewTaskTrack: PropTypes.bool,
    setShowCreateNewTaskTrack: PropTypes.func,
    children: PropTypes.node,
};
