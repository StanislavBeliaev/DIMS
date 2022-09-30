import React from 'react';
import classes from '../pages/pages.module.css';
import PropTypes from 'prop-types';

export const FormCreateNewTask = ({ children, onSubmit }) => {
    return (
        <form className={classes.FormCreateNewTask} onSubmit={onSubmit}>
            <label className={classes.FormCreateNewTaskContent}>
                Name
                <input type='text' className={classes.InputSize} name='name' placeholder='Name' required />
            </label>

            <label className={classes.FormCreateNewTaskContent}>
                Description
                <input type='text' className={classes.InputSize} name='description' placeholder='Description' />
            </label>

            <label className={classes.FormCreateNewTaskContent}>
                Start date
                <input type='date' className={classes.InputSize} name='date' required />
            </label>
            <label className={classes.FormCreateNewTaskContent}>
                Deadline
                <input type='date' className={classes.InputSize} name='deadline' required />
            </label>
            {children}
        </form>
    );
};
FormCreateNewTask.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
};
