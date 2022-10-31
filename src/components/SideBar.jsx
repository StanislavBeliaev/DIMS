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

export const SideBar = ({ burgerStatus, setBurgerStatus }) => {
    return (
        <>
            {burgerStatus ? (
                <div className={classes.SideBar}>
                    <Link to={'/Login/Members/Tasks'}>
                        <button className={classes.BurgerButtons}>Tasks</button>
                    </Link>
                    <Link to={'/Login/Members/'}>
                        <button className={classes.BurgerButtons}>Members</button>
                    </Link>
                    <Link to={'/'}>
                        <button className={classes.BurgerButtons}>Home</button>
                    </Link>
                    <Link to={'/'}>
                        <button className={classes.BurgerButtons}>About Us</button>
                    </Link>
                </div>
            ) : null}
        </>
    );
};
SideBar.propTypes = {
    burgerStatus: PropTypes.bool,
    setBurgerStatus: PropTypes.func,
};
