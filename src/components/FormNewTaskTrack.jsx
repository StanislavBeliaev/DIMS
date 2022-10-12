import React from 'react';
import classes from '../pages/pages.module.css';
import PropTypes from 'prop-types';

export const FormCreateNewTaskTrack = ({ children, onSubmit, taskTrack, setTaskTrack }) => {
    const textareaNote = {
        resize: 'none',
        width: '350px',
    };
    return (
        <form className={classes.FormCreateNewTask} onSubmit={onSubmit}>
            <label className={classes.FormCreateNewTaskContent}>
                Task
                <input
                    type='text'
                    className={classes.InputSize}
                    name='task'
                    value={taskTrack.task}
                    onChange={(e) => setTaskTrack({ ...taskTrack, task: e.target.value })}
                    placeholder='Task'
                    required
                />
            </label>

            <label className={classes.FormCreateNewTaskContent}>
                Date
                <input
                    type='date'
                    className={classes.InputSize}
                    name='date'
                    value={taskTrack.date}
                    onChange={(e) => setTaskTrack({ ...taskTrack, date: e.target.value })}
                    placeholder='Date'
                    required
                />
            </label>

            <label className={classes.FormCreateNewTaskTrackContent}>
                Note
                <textarea
                    type='text'
                    className={classes.InputSizeNote}
                    style={textareaNote}
                    value={taskTrack.note}
                    onChange={(e) => setTaskTrack({ ...taskTrack, note: e.target.value })}
                    name='note'
                    placeholder='Note'
                />
            </label>
            {children}
        </form>
    );
};
FormCreateNewTaskTrack.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    taskTrack: PropTypes.object,
    setTaskTrack: PropTypes.func,
};
