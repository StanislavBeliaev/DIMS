import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';
import { SideBar } from 'components/SideBar';
import { getDatabase, ref, set, push, child, onValue, update, remove } from 'firebase/database';
import { ProtectedRoute } from 'ProtectedRoute';
import { LogoutSVG } from 'SVG/LogoutSVG';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginSVG } from 'SVG/LoginSVG';
import { BurgetMenuSVG } from 'SVG/BurgerMenuSVG';
import '../firebs';
import app from '../firebs';
import Members from '../pages/Members';
import PropTypes from 'prop-types';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';
import LoginPage from '../pages/LoginPage';
import classes from './App.module.css';
import Tasks from 'pages/Tasks';
import TasksTracks from 'pages/TasksTracks';

function App() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [accToken, setAccToken] = useState({ token: '' });
    const logOut = () => {
        setIsLoggedin(false);
        setAccToken({ token: '' });
    };

    const [burgerStatus, setBurgerStatus] = useState(false);
    const burger = () => {
        setBurgerStatus((prev) => !prev);
    };

    return (
        <div className={classes.Main}>
            <div className={classes.Header}>
                <div className={classes.Header__Menu}>
                    <Button className={classes.burgerMenu} onClick={burger}>
                        <BurgetMenuSVG />
                    </Button>
                    <span className={classes.LogoName}>DIMS</span>
                </div>
                <div className={classes.ButtonContainer}>
                    {isLoggedin ? (
                        <Link to='/'>
                            <button className={classes.Login} onClick={logOut}>
                                <LogoutSVG />
                                Logout
                            </button>
                        </Link>
                    ) : (
                        <Link to='/Login'>
                            <button className={classes.Login}>
                                Login
                                <LoginSVG />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={classes.ContentContainer}>
                {isLoggedin ? <SideBar burgerStatus={burgerStatus} setBurgerStatus={setBurgerStatus} /> : null}
                <Routes>
                    <Route
                        exact
                        path='/Login'
                        element={
                            <LoginPage
                                login={isLoggedin}
                                setLogin={setIsLoggedin}
                                accToken={accToken}
                                setAccToken={setAccToken}
                            />
                        }
                    ></Route>
                    <Route element={<ProtectedRoute isLoggedin={isLoggedin} />}>
                        <Route exact path='/Login/Members/' element={<Members />} />
                        <Route exact path='/Login/Members/Tasks' element={<Tasks />} />
                        <Route exact path='/Login/Members/:UserID/Tasks' element={<MembersTasks />} />
                        <Route exact path='/Login/Members/:UserID/MemberProgress' element={<MembersProgress />} />
                        <Route exact path='/Login/Members/:UserID/TasksTracks/:TaskID' element={<TasksTracks />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
