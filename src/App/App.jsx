import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';
import { SideBar } from 'components/SideBar';
import { getDatabase, ref, set, push, child, onValue, update, remove } from 'firebase/database';
import { ProtectedRoute } from 'ProtectedRoute';
import { ProtectedRouteMentor } from 'ProtectedRouteMentor';
import { ProtectedRouteMember } from 'ProtectedRouteMember';
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
import { useDispatch, useSelector } from 'react-redux';
import { dataLoadedSuccess } from 'features/counter/dataSilce';
import TasksTracks from 'pages/TasksTracks';
import { Counter } from 'features/counter/Counter';

function App() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [accToken, setAccToken] = useState({ token: '' });
    const [data, setData] = useState({});
    const userRole = useSelector((state) => state.user.role);
    console.log(userRole);
    const dispatch = useDispatch();

    const database = getDatabase(app);
    const getfulldata = ref(database, '/');
    useEffect(
        () =>
            onValue(getfulldata, (snapshot) => {
                const data = snapshot.val();
                dispatch(dataLoadedSuccess(data));
            }),
        [],
    );

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
                {isLoggedin ? (
                    <SideBar burgerStatus={burgerStatus} setBurgerStatus={setBurgerStatus} userRole={userRole} />
                ) : null}
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
                    <Route element={<ProtectedRoute isLoggedin={isLoggedin} role={userRole} />}>
                        <Route exact path='/Members/' element={<Members linkPref={'/'} />} />
                        <Route exact path='/Tasks/' element={<Tasks />} />
                        <Route exact path='/:UserID/Tasks' element={<MembersTasks linkPref='/' />} />
                        <Route exact path='/:UserID/MemberProgress' element={<MembersProgress />} />
                        <Route exact path='/:UserID/TasksTracks/:TaskID' element={<TasksTracks />} />
                    </Route>
                    <Route element={<ProtectedRouteMentor isLoggedin={isLoggedin} role={userRole} />}>
                        <Route exact path='/MentorMembers/' element={<Members linkPref={'/Mentor/'} />} />
                        <Route exact path='/Mentor/:UserID/Tasks' element={<MembersTasks linkPref='/Mentor/' />} />
                        <Route exact path='/Mentor/:UserID/MemberProgress' element={<MembersProgress />} />
                        <Route exact path='/MentorTasks/' element={<Tasks />} />
                        <Route exact path='/Mentor/:UserID/TasksTracks/:TaskID' element={<TasksTracks />} />
                    </Route>
                    <Route element={<ProtectedRouteMember isLoggedin={isLoggedin} role={userRole} />}>
                        <Route exact path='/Member/:UserID/Tasks' element={<MembersTasks linkPref={'/Member/'} />} />
                        <Route
                            exact
                            path='/Member/:UserID/TasksTracks/:TaskID'
                            element={<TasksTracks linkPref={'/Member/'} />}
                        />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
