import React, { useState, useEffect } from 'react';
import Members from './Members';
import app from '../firebs';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ModalCreateNewTask } from 'components/Modal/ModalCreateNewTask';
import { FormCreateNewTask } from 'components/FormCreateNewTask';
import { Button } from 'components/Buttons/Button/Button';
import classes from './pages.module.css';
import { Routes, Route, useParams } from 'react-router-dom';

function Tasks() {
    const [showCreateNewTask, setShowCreateNewTask] = useState(false);
    const openCreateNewTask = () => {
        setShowCreateNewTask((prev) => !prev);
    };
    const database = getDatabase(app);
    const [data, setData] = useState([]);
    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setData(Object.entries(data));
            }),
        [],
    );
    console.log(data);
    return (
        <div className={classes.TasksContainer}>
            <div className={classes.HeaderTasks}>
                <p className={classes.HeaderTasksName}>Tasks</p>
                <Button className={classes.ButtonCreateTasks} onClick={openCreateNewTask}>
                    Create
                </Button>
            </div>
            <ModalCreateNewTask showCreateNewTask={showCreateNewTask} setShowCreateNewTask={setShowCreateNewTask}>
                <div className={classes.CreateNewTaskContainer}>
                    <div className={classes.HeaderNewTask}>
                        <p className={classes.HeaderNewTaskText}>Create new task</p>
                    </div>
                    <div className={classes.CreateNewTaskContent}>
                        <FormCreateNewTask>
                            <label className={classes.FormCreateNewTaskContent}>
                                Members
                                <input type='checkbox' />
                            </label>
                            <div className={classes.CreateNewTaskFooter}>
                                <Button className={classes.ButtonSave} type='submit'>
                                    Save
                                </Button>
                                <Button className={classes.ButtonBack} onClick={() => setShowCreateNewTask(false)}>
                                    Back To List
                                </Button>
                            </div>
                        </FormCreateNewTask>
                    </div>
                </div>
            </ModalCreateNewTask>

            <div className={classes.TasksTableContainer}>
                <table className={classes.Table}>
                    <tbody>
                        <tr className={classes.Tr}>
                            <th className={classes.Th}>#</th>
                            <th className={classes.Th}>Tasks name</th>
                            <th className={classes.Th}>Description</th>
                            <th className={classes.Th}>Start date</th>
                            <th className={classes.Th}>Deadline</th>
                            <th className={classes.Th}>Action</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tasks;
