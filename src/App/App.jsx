import React, { useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button } from 'components/Buttons/Button/Button';
import { SideBar } from 'components/SideBar';
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
    console.log(burgerStatus);
    return (
        <div className={classes.Main}>
            <div className={classes.Header}>
                <div className={classes.Header__Menu}>
                    <Button className={classes.burgerMenu} onClick={burger}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='50'
                            height='50'
                            fill='currentColor'
                            className='bi bi-list'
                            viewBox='0 0 16 16'
                            style={{ color: 'white' }}
                        >
                            <path
                                fillRule='evenodd'
                                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                            />
                        </svg>
                    </Button>
                    <span className={classes.LogoName}>DIMS</span>
                </div>
                <div className={classes.ButtonContainer}>
                    {isLoggedin ? (
                        <Link to='/'>
                            <button className={classes.Login} onClick={logOut}>
                                <div>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-box-arrow-left'
                                        viewBox='0 0 16 16'
                                        style={{ color: '#d9534f' }}
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
                                        />
                                    </svg>
                                </div>
                                Logout
                            </button>
                        </Link>
                    ) : (
                        <Link to='/Login'>
                            <button className={classes.Login}>
                                Login
                                <div>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-box-arrow-right'
                                        viewBox='0 0 16 16'
                                        style={{ color: '#5384ff' }}
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                                        />
                                    </svg>
                                </div>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={classes.ContentContainer}>
                <SideBar burgerStatus={burgerStatus} setBurgerStatus={setBurgerStatus} />
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
                    >
                        <Route path='/Login/Members/' element={<Members />} />
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
