import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from '../../pages/pages.module.css';
import app from '../../firebs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDatabase, ref, update } from 'firebase/database';
import Button from 'react-bootstrap/Button';
import { Mentor } from 'constants';
import { Admin } from 'constants';
import { Member } from 'constants';

export const Table = ({ userTasks, params, linkPref, userRole }) => {
    const userID = useSelector((state) => state.user.id);
    const database = getDatabase(app);
    const statusChange = (id, { name, description, startdate, deadline, assignedUsers }, newStatus) => {
        update(ref(database, 'tasks/' + id), {
            name,
            description,
            startdate,
            deadline,
            assignedUsers,
            status: newStatus,
        });
    };
    const colors = {
        Success: 'Green',
        Active: 'Blue',
        Fail: 'Red',
    };
    return (
        <table className={classes.Table}>
            <tbody>
                <tr className={classes.Tr}>
                    <th className={classes.Th}>#</th>
                    <th className={classes.Th}>Task name</th>
                    <th className={classes.Th}>Start date</th>
                    <th className={classes.Th}>Deadline</th>
                    <th className={classes.Th}>Status</th>
                    {userRole === Mentor ? <th className={classes.Th}>Update status</th> : null}
                </tr>
                {Object.entries(userTasks)
                    .filter(([k, v]) => v.assignedUsers.includes(params.UserID))
                    .map(([id, val], idx) => {
                        return (
                            <tr key={id} className={classes.TrData}>
                                <td className={classes.Td}>{idx + 1}</td>
                                {userRole === Member || userRole === Admin ? (
                                    <td className={classes.Td}>
                                        <Link to={linkPref + params.UserID + '/TasksTracks/' + id}>{val.name}</Link>
                                    </td>
                                ) : (
                                    <td className={classes.Td}>{val.name}</td>
                                )}

                                <td className={classes.Td}>{val.startdate}</td>
                                <td className={classes.Td}>{val.deadline}</td>
                                <td className={classes.Td} style={{ color: colors[val.status] }}>
                                    {val.status}
                                </td>
                                {userRole === Mentor ? (
                                    <td className={classes.TdButtons}>
                                        <Button
                                            variant='success'
                                            onClick={function () {
                                                statusChange(id, val, 'Success');
                                            }}
                                        >
                                            Success
                                        </Button>
                                        <Button variant='primary' onClick={() => statusChange(id, val, 'Active')}>
                                            Active
                                        </Button>
                                        <Button variant='danger' onClick={() => statusChange(id, val, 'Fail')}>
                                            Fail
                                        </Button>
                                    </td>
                                ) : null}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};
Table.propTypes = {
    userTasks: PropTypes.object,
    params: PropTypes.object,
    linkPref: PropTypes.string,
    userRole: PropTypes.string,
};
