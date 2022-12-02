import React from 'react';
import classes from '../pages/pages.module.css';
import PropTypes from 'prop-types';

export const FormCreateNewTask = ({ children, onSubmit, task, setTask }) => {
    return (
        <form className={classes.FormCreateNewTask} onSubmit={onSubmit}>
            <label className={classes.FormCreateNewTaskContent}>
                Name
                <input
                    type='text'
                    className={classes.InputSize}
                    name='name'
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    placeholder='Name'
                    required
                />
            </label>

            <label className={classes.FormCreateNewTaskContent}>
                Description
                <input
                    type='text'
                    className={classes.InputSize}
                    name='description'
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    placeholder='Description'
                />
            </label>

            <label className={classes.FormCreateNewTaskContent}>
                Start date
                <input
                    type='date'
                    className={classes.InputSize}
                    name='date'
                    value={task.startdate}
                    onChange={(e) => setTask({ ...task, startdate: e.target.value })}
                    required
                />
            </label>
            <label className={classes.FormCreateNewTaskContent}>
                Deadline
                <input
                    type='date'
                    className={classes.InputSize}
                    name='deadline'
                    value={task.deadline}
                    onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                    required
                />
            </label>
            <label className={classes.FormCreateNewTaskContent}>
                <input
                    type='hidden'
                    className={classes.InputSize}
                    name='status'
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                />
            </label>
            {children}
        </form>
    );
};
FormCreateNewTask.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    task: PropTypes.object,
    setTask: PropTypes.func,
};
