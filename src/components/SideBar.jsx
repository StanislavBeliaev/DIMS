import React, { useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';
import Members from '../pages/Members';
import PropTypes from 'prop-types';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';
import LoginPage from '../pages/LoginPage';
import classes from '../App/App.module.css';
import Tasks from 'pages/Tasks';
import TasksTracks from 'pages/TasksTracks';

const rolesToLinks = {
    Admin: [
        { link: '/Tasks/', label: 'Tasks' },
        { link: '/Members/', label: 'Members' },
        { link: '/', label: 'Home' },
        { link: '/', label: 'About Us' },
    ],
    Mentor: [
        { link: '/MentorTasks/', label: 'Tasks' },
        { link: '/MentorMembers/', label: 'Members' },
        { link: '/', label: 'Home' },
        { link: '/', label: 'About Us' },
    ],
};
export const SideBar = ({ burgerStatus, setBurgerStatus, userRole }) => {
    return (
        <>
            {rolesToLinks[userRole] && burgerStatus ? (
                <div className={classes.SideBar}>
                    {rolesToLinks[userRole].map(({ link, label }, idx) => (
                        <Link to={link} key={idx}>
                            <button className={classes.BurgerButtons}>{label}</button>
                        </Link>
                    ))}
                </div>
            ) : null}
        </>
    );
};
SideBar.propTypes = {
    burgerStatus: PropTypes.bool,
    setBurgerStatus: PropTypes.func,
    userRole: PropTypes.string,
};
