import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../pages/pages.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';

export const Table = ({ userTasks, params, linkPref }) => {
    return (
        <table className={classes.Table}>
            <tbody>
                <tr className={classes.Tr}>
                    <th className={classes.Th}>#</th>
                    <th className={classes.Th}>Task name</th>
                    <th className={classes.Th}>Start date</th>
                    <th className={classes.Th}>Deadline</th>
                    <th className={classes.Th}>Status</th>
                </tr>
                {Object.entries(userTasks)
                    .filter(([k, v]) => v.assignedUsers.includes(params.UserID))
                    .map(([id, val], idx) => {
                        return (
                            <tr key={id} className={classes.TrData}>
                                <td className={classes.Td}>{idx + 1}</td>

                                <td className={classes.Td}>
                                    <Link to={linkPref + params.UserID + '/TasksTracks/' + id}>{val.name}</Link>
                                </td>
                                <td className={classes.Td}>{val.startdate}</td>
                                <td className={classes.Td}>{val.deadline}</td>
                                <td className={classes.Td}>{}</td>
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
};
