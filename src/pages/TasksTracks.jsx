import React from 'react';
import { Button } from 'components/Buttons/Button/Button';
import { ModalCreateNewTaskTarack } from 'components/Modal/ModalCreateNewTaskTrack';
import { FormCreateNewTaskTrack } from 'components/FormNewTaskTrack';
import { ModalEdit } from 'components/Modal/ModalEdit';
import { ModalDelete } from 'components/Modal/ModalDelete';
import classes from './pages.module.css';
import '../firebs';
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
import app from '../firebs';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TasksTracks() {
    const UserIDandTaksID = useParams();
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const openDelete = (val, id) => {
        setShowDelete((prev) => !prev);
        setCurrentTaskTrack(val);
        setTaskTrackID(id);
    };
    const database = getDatabase(app);
    console.log(UserIDandTaksID);
    const [showCreateNewTaskTrack, setShowCreateNewTaskTrack] = useState(false);
    const openModalCreateNewTaskTrack = () => {
        setShowCreateNewTaskTrack((prev) => !prev);
    };
    const [taskTrackData, setTaskTrackData] = useState([]);
    const tasksTracks = ref(database, 'tasksTracks/');
    useEffect(
        () =>
            onValue(tasksTracks, (snapshot) => {
                const taskTrackData = snapshot.val();
                setTaskTrackData(
                    Object.entries(taskTrackData).filter(
                        ([id, value]) =>
                            value.assignedUser.includes(UserIDandTaksID.UserID) &&
                            value.currentTaskID.includes(UserIDandTaksID.TaskID),
                    ),
                );
            }),
        [],
    );
    console.log(taskTrackData);
    const [currentTaskTrack, setCurrentTaskTrack] = useState({
        task: '',
        date: '',
        note: '',
    });
    const [taskTrackID, setTaskTrackID] = useState('');
    const openEdit = (val, id) => {
        setShowEdit((prev) => !prev);
        setCurrentTaskTrack(val);
        setTaskTrackID(id);
    };
    function CreateNewTaskTack(e) {
        e.preventDefault();
        const target = e.target;
        const task = target.task.value;
        const date = target.date.value;
        const note = target.note.value;
        const taskTrackID = push(child(ref(database), 'users')).key;
        set(ref(database, 'tasksTracks/' + taskTrackID), {
            task: task,
            date: date,
            note: note,
            assignedUser: UserIDandTaksID.UserID,
            currentTaskID: UserIDandTaksID.TaskID,
        });
    }
    function EditNewTaskTack(e) {
        e.preventDefault();
        const target = e.target;
        const task = target.task.value;
        const date = target.date.value;
        const note = target.note.value;
        update(ref(database, 'tasksTracks/' + taskTrackID), {
            task: task,
            date: date,
            note: note,
            assignedUser: UserIDandTaksID.UserID,
            currentTaskID: UserIDandTaksID.TaskID,
        });
    }
    function deleteUser() {
        remove(ref(database, 'tasksTracks/' + taskTrackID));

        setShowDelete(false);
    }
    return (
        <div className={classes.TasksTracksContainer}>
            <div className={classes.TasksTracksHeader}>
                <p className={classes.TasksTracksName}>TasksTracks</p>
                <Button className={classes.ButtonCreateTasks} onClick={openModalCreateNewTaskTrack}>
                    Create
                </Button>
            </div>
            <ModalCreateNewTaskTarack
                showCreateNewTaskTrack={showCreateNewTaskTrack}
                setShowCreateNewTaskTrack={setShowCreateNewTaskTrack}
            >
                <div className={classes.ModalCreateNewTaskTarackContainer}>
                    <p className={classes.ModalCreateNewTaskTarackName}>Create new task track</p>
                    <FormCreateNewTaskTrack
                        onSubmit={CreateNewTaskTack}
                        taskTrack={currentTaskTrack}
                        setTaskTrack={setCurrentTaskTrack}
                    >
                        <div className={classes.CreateNewTaskTrackFooter}>
                            <Button className={classes.ButtonSave} type='submit'>
                                Save
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowCreateNewTaskTrack(false)}>
                                Back To List
                            </Button>
                        </div>
                    </FormCreateNewTaskTrack>
                </div>
            </ModalCreateNewTaskTarack>
            <ModalEdit showEdit={showEdit} setShowEdit={setShowEdit}>
                <div className={classes.ModalCreateNewTaskTarackContainer}>
                    <p className={classes.ModalCreateNewTaskTarackName}>Edit task track</p>
                    <FormCreateNewTaskTrack
                        onSubmit={EditNewTaskTack}
                        taskTrack={currentTaskTrack}
                        setTaskTrack={setCurrentTaskTrack}
                    >
                        <div className={classes.CreateNewTaskTrackFooter}>
                            <Button className={classes.ButtonSave} type='submit'>
                                Save
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowEdit(false)}>
                                Back To List
                            </Button>
                        </div>
                    </FormCreateNewTaskTrack>
                </div>
            </ModalEdit>
            <ModalDelete showDelete={showDelete} setShowDelete={setShowDelete}>
                <div className={classes.ModalDeleteContainer}>
                    <div className={classes.ModalDeleteHeader}>
                        <p className={classes.ModalDeleteName}>Delete task track</p>
                    </div>
                    <div className={classes.ModalDeleteTextContainer}>
                        <p className={classes.ModalDeleteText}>
                            Are you sure you want to delete the current task track ?
                        </p>
                    </div>
                    <div className={classes.ModalDeleteFooter}>
                        <div className={classes.DeleteButtons}>
                            <Button className={classes.ActionButtonDelete} onClick={deleteUser}>
                                Delete
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowDelete(false)}>
                                Back To List
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalDelete>
            <table className={classes.Table}>
                <tbody>
                    <tr className={classes.Tr}>
                        <th className={classes.Th}>#</th>
                        <th className={classes.Th}>Tasks</th>
                        <th className={classes.Th}>Note</th>
                        <th className={classes.Th}>Date</th>
                        <th className={classes.Th}>Action</th>
                    </tr>
                    {taskTrackData.map(([id, val], idx) => {
                        return (
                            <tr key={id} className={classes.TrData}>
                                <td className={classes.Td}>{idx + 1}</td>
                                <td className={classes.Td}>{val.task}</td>
                                <td className={classes.Td}>{val.note}</td>
                                <td className={classes.Td}>{val.date}</td>
                                <td className={classes.Td}>
                                    <Button className={classes.ActionButtonEdit} onClick={() => openEdit(val, id)}>
                                        Edit
                                    </Button>
                                    <Button className={classes.ActionButtonDelete} onClick={() => openDelete(val, id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TasksTracks;
