import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../pages/pages.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';

export const Table = ({ usersData, opedEdit, openDelete, linkPref, userRole }) => {
    return (
        <table className={classes.Table}>
            <tbody>
                <tr className={classes.Tr}>
                    <th className={classes.Th}>#</th>
                    <th className={classes.Th}>Full Name</th>
                    <th className={classes.Th}>Direction</th>
                    <th className={classes.Th}>Education</th>
                    <th className={classes.Th}>Start</th>
                    <th className={classes.Th}>Age</th>
                    <th className={classes.Th}>Action</th>
                </tr>

                {Object.entries(usersData).map(([id, val], idx) => {
                    return (
                        <tr key={id} className={classes.TrData}>
                            <td className={classes.Td}>{idx + 1}</td>
                            <td className={classes.Td}>{val.name}</td>
                            <td className={classes.Td}>{val.direction}</td>
                            <td className={classes.Td}>{val.education}</td>
                            <td className={classes.Td}>{val.startdate}</td>
                            <td className={classes.Td}>{val.dateofbirth}</td>
                            <td className={classes.TdButtons}>
                                <Link to={linkPref + id + '/Tasks'}>
                                    <Button className={classes.ActionButtonTasks}>Tasks</Button>
                                </Link>
                                <Link to={linkPref + id + '/MemberProgress'}>
                                    <Button className={classes.ActionButtonProgress}>Progress</Button>
                                </Link>
                                {userRole === 'Admin' ? (
                                    <>
                                        <Button className={classes.ActionButtonEdit} onClick={() => opedEdit(val, id)}>
                                            Edit
                                        </Button>
                                        <Button
                                            className={classes.ActionButtonDelete}
                                            onClick={() => openDelete(val, id)}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    linkPref: PropTypes.string,
    usersData: PropTypes.object,
    openDelete: PropTypes.func,
    opedEdit: PropTypes.func,
    userRole: PropTypes.string,
};
