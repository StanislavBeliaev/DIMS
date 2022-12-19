import React, { useState, useEffect } from 'react';
import '../firebs';
import { useParams } from 'react-router-dom';
import classes from './pages.module.css';
import { getDatabase, ref, onValue } from 'firebase/database';

function MembersProgress() {
    const UserID = useParams();
    const database = getDatabase();
    const [data, setData] = useState([]);
    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setData(Object.entries(data).filter(([k, v]) => k.includes(UserID.UserID)));
            }),
        [],
    );
    const [tasksData, setTasksData] = useState([]);
    const tasks = ref(database, 'tasksTracks/');
    useEffect(
        () =>
            onValue(tasks, (snapshot) => {
                const tasksData = snapshot.val();
                setTasksData(Object.entries(tasksData).filter(([k, v]) => v.assignedUser.includes(UserID.UserID)));
            }),
        [],
    );

    return (
        <div className={classes.MembersProgressContainer}>
            <p style={{ fontsize: 40 }}>
                {data.map(([id, val]) => {
                    return val.name + ' ' + val.lastname;
                })}{' '}
                progress
            </p>
            <table className={classes.Table}>
                <tbody>
                    <tr className={classes.Tr}>
                        <th className={classes.Th}>#</th>
                        <th className={classes.Th}>Task name</th>
                        <th className={classes.Th}>Task note</th>
                        <th className={classes.Th}>Date</th>
                    </tr>
                    {tasksData.map(([id, val], idx) => {
                        return (
                            <tr key={id} className={classes.TrData}>
                                <td className={classes.Td}>{idx + 1}</td>
                                <td className={classes.Td}>{val.task}</td>
                                <td className={classes.Td}>{val.note}</td>
                                <td className={classes.Td}>{val.date}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default MembersProgress;
