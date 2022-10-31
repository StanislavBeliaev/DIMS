import React, { useState, useEffect } from 'react';
import Members from './Members';
import app from '../firebs';
import { ModalDelete } from 'components/Modal/ModalDelete';
import { ModalEdit } from 'components/Modal/ModalEdit';
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    child,
    remove,
    update,
    query,
    orderByChild,
    equalTo,
    get,
} from 'firebase/database';
import { ModalCreateNewTask } from 'components/Modal/ModalCreateNewTask';
import { FormCreateNewTask } from 'components/FormCreateNewTask';
import { Button } from 'components/Buttons/Button/Button';
import classes from './pages.module.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { async } from '@firebase/util';

function Tasks() {
    const [showCreateNewTask, setShowCreateNewTask] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [tasksID, setTasksID] = useState('');
    const [currentTask, setCurrentTask] = useState({
        name: '',
        description: '',
        startdate: '',
        deadline: '',
        assignedUsers: [],
    });
    const openDelete = (id) => {
        setShowDelete((prev) => !prev);
        setTasksID(id);
    };
    const openEdit = (user, id) => {
        setShowEdit((prev) => !prev);
        setTasksID(id);
        setCurrentTask(user);
    };

    const [member, setMember] = useState([]);
    const [tasksData, setTasksData] = useState([]);
    const openCreateNewTask = () => {
        setShowCreateNewTask((prev) => !prev);
    };
    const database = getDatabase(app);
    const [data, setData] = useState([]);
    const users = ref(database, 'users/');
    //  console.log(test());

    // const getData = async () => {
    //     const readNewLogEntries = await get(
    //       query(ref(database, "tasks/"), orderByChild("assignedUser"))
    //       // Filters where "type" is equal to "Request". Single arg here ⬆
    //     );
    //     console.log(readNewLogEntries.val())
    //     return readNewLogEntries.val();
    //   };
    //   console.log(getData())
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setData(Object.entries(data));
            }),
        [],
    );
    console.log(data);
    const tasks = ref(database, 'tasks/');
    useEffect(
        () =>
            onValue(tasks, (snapshot) => {
                const tasksData = snapshot.val();
                setTasksData(Object.entries(tasksData));
            }),
        [],
    );
    console.log(tasksData);
    function saveUsersTasks(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const description = target.description.value;
        const startdate = target.date.value;
        const deadline = target.deadline.value;
        const assignedUsers = target.assignedUsers.value;
        const taskId = push(child(ref(database), 'users')).key;
        const usersTaskId = push(child(ref(database), 'users')).key;
        set(ref(database, 'tasks/' + taskId), {
            name: name,
            description: description,
            startdate: startdate,
            deadline: deadline,
            assignedUsers: member,
        });
        //     member.forEach((userId) => set(ref(database, 'userTasks/' + usersTaskId), {
        //      taskId,
        //      userId,
        //  }))
    }
    function saveEditUsersTasks(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const description = target.description.value;
        const startdate = target.date.value;
        const deadline = target.deadline.value;
        const assignedUsers = target.assignedUsers.value;
        update(ref(database, 'tasks/' + tasksID), {
            name: name,
            description: description,
            startdate: startdate,
            deadline: deadline,
            assignedUsers: currentTask.assignedUsers,
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
    const handleCheckEdit = (e) => {
        let updatedList = [...currentTask.assignedUsers];
        if (e.target.checked) {
            updatedList = [...currentTask.assignedUsers, e.target.value];
        } else {
            updatedList.splice(currentTask.assignedUsers.indexOf(e.target.value), 1);
        }
        setCurrentTask({ ...currentTask, assignedUsers: updatedList });
    };

    function deleteTasks() {
        remove(ref(database, 'tasks/' + tasksID));
        setShowDelete(false);
    }
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
                        <FormCreateNewTask onSubmit={saveUsersTasks} task={currentTask} setTask={setCurrentTask}>
                            <div className={classes.TasksMembersName}>
                                <label>Members</label>
                                <div className={classes.MembersNameContainer}>
                                    {data.map(([id, val], idx) => {
                                        return (
                                            <label className={classes.NewTasksName} key={id}>
                                                <input
                                                    type='checkbox'
                                                    name='assignedUsers'
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
            <ModalDelete showDelete={showDelete} setShowDelete={setShowDelete}>
                <div className={classes.ModalDeleteContainer}>
                    <div className={classes.ModalDeleteHeader}>
                        <p className={classes.ModalDeleteName}> Delete tasks </p>
                    </div>
                    <div className={classes.ModalDeleteTextContainer}>
                        <p className={classes.ModalDeleteText}>Are you sure you want to delete the current tasks ?</p>
                    </div>
                    <div className={classes.ModalDeleteFooter}>
                        <div className={classes.DeleteButtons}>
                            <Button className={classes.ActionButtonDelete} onClick={deleteTasks}>
                                Delete
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowDelete(false)}>
                                Back To List
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalDelete>
            <ModalEdit showEdit={showEdit} setShowEdit={setShowEdit}>
                <div className={classes.CreateNewTaskContainer}>
                    <div className={classes.HeaderNewTask}>
                        <p className={classes.HeaderNewTaskText}>Edit task</p>
                    </div>
                    <div className={classes.CreateNewTaskContent}>
                        <FormCreateNewTask onSubmit={saveEditUsersTasks} task={currentTask} setTask={setCurrentTask}>
                            <div className={classes.TasksMembersName}>
                                <label>Members</label>
                                <div className={classes.MembersNameContainer}>
                                    {data.map(([id, val], idx) => {
                                        return (
                                            <label className={classes.NewTasksName} key={id}>
                                                <input
                                                    type='checkbox'
                                                    name='assignedUsers'
                                                    value={id}
                                                    checked={currentTask?.assignedUsers?.includes(id)}
                                                    onChange={handleCheckEdit}
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
                                <Button className={classes.ButtonBack} onClick={() => setShowEdit(false)}>
                                    Back To List
                                </Button>
                            </div>
                        </FormCreateNewTask>
                    </div>
                </div>
            </ModalEdit>
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
                                        <Button className={classes.ActionButtonEdit} onClick={() => openEdit(val, id)}>
                                            Edit
                                        </Button>
                                        <Button className={classes.ActionButtonDelete} onClick={() => openDelete(id)}>
                                            Delete
                                        </Button>
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
