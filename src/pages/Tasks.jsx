import React, { useState, useEffect } from 'react';
import Members from './Members';
import app from '../firebs';
import { getDatabase, ref, onValue, set, push, child } from 'firebase/database';
import { ModalCreateNewTask } from 'components/Modal/ModalCreateNewTask';
import { FormCreateNewTask } from 'components/FormCreateNewTask';
import { Button } from 'components/Buttons/Button/Button';
import classes from './pages.module.css';
import { Routes, Route, useParams } from 'react-router-dom';

function Tasks() {
    const [showCreateNewTask, setShowCreateNewTask] = useState(false);
    const [member, setMember] = useState([]);
    const [tasksData, setTasksData] = useState([]);
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
    const tasks = ref(database, 'tasks/');
    useEffect(
        () =>
            onValue(tasks, (snapshot) => {
                const tasksData = snapshot.val();
                setTasksData(Object.entries(tasksData));
            }),
        [],
    );
    function saveUsersTasks(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const description = target.description.value;
        const startdate = target.date.value;
        const deadline = target.deadline.value;
        const checkboxname = target.checkboxname.value;
        const taskId = push(child(ref(database), 'users')).key;
        set(ref(database, 'tasks/' + taskId), {
            name: name,
            description: description,
            startdate: startdate,
            deadline: deadline,
            checkboxname: member,
        });
    }
    const handleCheck = (event) => {
        let updatedList = [...member];
        if (event.target.checked) {
            updatedList = [...member, event.target.value];
        } else {
            updatedList.splice(member.indexOf(event.target.value), 1);
        }
        setMember(updatedList);
    };
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
                        <FormCreateNewTask onSubmit={saveUsersTasks}>
                            <div className={classes.TasksMembersName}>
                                <label>Members</label>
                                <div className={classes.MembersNameContainer}>
                                    {data.map(([id, val], idx) => {
                                        return (
                                            <label className={classes.NewTasksName} key={id}>
                                                <input
                                                    type='checkbox'
                                                    name='checkboxname'
                                                    value={id}
                                                    onChange={handleCheck}
                                                />
                                                {val.name}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

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
                        {tasksData.map(([id, val], idx) => {
                            return (
                                <tr key={id} className={classes.TrData}>
                                    <td className={classes.Td}>{idx + 1}</td>
                                    <td className={classes.Td}>{val.name}</td>
                                    <td className={classes.Td}>{val.description}</td>
                                    <td className={classes.Td}>{val.startdate}</td>
                                    <td className={classes.Td}>{val.deadline}</td>
                                    <td className={classes.TdButtons}>
                                        <Button className={classes.ActionButtonEdit}>Edit</Button>
                                        <Button className={classes.ActionButtonDelete}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tasks;
