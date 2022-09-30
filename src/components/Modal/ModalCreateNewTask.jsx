import React from 'react';
import PropTypes from 'prop-types';

export const ModalCreateNewTask = ({ showCreateNewTask, setShowCreateNewTask, children }) => {
    return <>{showCreateNewTask ? <div>{children}</div> : null}</>;
};
ModalCreateNewTask.propTypes = {
    showCreateNewTask: PropTypes.bool,
    setShowCreateNewTask: PropTypes.func,
    children: PropTypes.node,
};
