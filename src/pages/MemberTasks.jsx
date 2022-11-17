import React, { useState, useEffect } from 'react';
import { Button } from 'components/Buttons/Button/Button';
import '../firebs';
import app from '../firebs';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import classes from './pages.module.css';
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

function MembersTasks() {
    const params = useParams();
    const database = getDatabase(app);
    const [tasksData, setTasksData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userName, setUserName] = useState('');
    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setUserData(Object.entries(data).filter(([k, v]) => k.includes(params.UserID)));
                setUserName(Object.entries(data).find(([k, v]) => k.includes(params.UserID))[1].name);
            }),
        [],
    );

    const tasks = ref(database, 'tasks/');
    useEffect(
        () =>
            onValue(tasks, (snapshot) => {
                const data = snapshot.val();
                setTasksData(Object.entries(data).filter(([k, v]) => v.assignedUsers.includes(params.UserID)));
            }),
        [],
    );

    return (
        <div className={classes.MembersTasksContainer}>
            <p>Hi! Dear {userName}! There are your current tasks</p>
            <table className={classes.Table}>
                <tbody>
                    <tr className={classes.Tr}>
                        <th className={classes.Th}>#</th>
                        <th className={classes.Th}>Task name</th>
                        <th className={classes.Th}>Start date</th>
                        <th className={classes.Th}>Deadline</th>
                        <th className={classes.Th}>Status</th>
                    </tr>
                    {tasksData.map(([id, val], idx) => {
                        return (
                            <tr key={id} className={classes.TrData}>
                                <td className={classes.Td}>{idx + 1}</td>

                                <td className={classes.Td}>
                                    <Link to={'/Login/Members/' + params.UserID + '/TasksTracks/' + id}>
                                        {val.name}
                                    </Link>
                                </td>
                                <td className={classes.Td}>{val.startdate}</td>
                                <td className={classes.Td}>{val.deadline}</td>
                                <td className={classes.Td}>{}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default MembersTasks;
