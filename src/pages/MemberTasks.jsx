import React, { useState, useEffect } from 'react';
import { Button } from 'components/Buttons/Button/Button';
import '../firebs';
import app from '../firebs';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import classes from './pages.module.css';
import { useSelector } from 'react-redux';
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
import { Table } from 'components/Tables/MemberTasksTable';
import PropTypes from 'prop-types';
import { Admin } from 'constants';
import { Mentor } from 'constants';

function MembersTasks({ linkPref }) {
    /*eslint no-debugger: 1*/
    const params = useParams();
    const database = getDatabase(app);
    const [tasksData, setTasksData] = useState([]);
    const [userName, setUserName] = useState('');
    const userTasks = useSelector((state) => state.fulldata.tasks);
    const userRole = useSelector((state) => state.user.role);

    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setUserName(Object.entries(data).find(([k, v]) => k.includes(params.UserID))[1].name);
            }),
        [],
    );
    return (
        <div className={classes.MembersTasksContainer}>
            {userRole === Admin || userRole === Mentor ? (
                <p className={classes.MembersTasksText}>{userName} current tasks</p>
            ) : (
                <p className={classes.MembersTasksText}>Hi! Dear {userName}! There are your current tasks</p>
            )}

            <Table userTasks={userTasks} params={params} linkPref={linkPref} userRole={userRole} />
        </div>
    );
}
MembersTasks.propTypes = {
    Table: PropTypes.func,
    linkPref: PropTypes.string,
};
export default MembersTasks;
