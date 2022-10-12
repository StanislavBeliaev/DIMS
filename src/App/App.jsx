import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Members from '../pages/Members';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';
import LoginPage from '../pages/LoginPage';
import classes from './App.module.css';
import Tasks from 'pages/Tasks';
import TasksTracks from 'pages/TasksTracks';

function App() {
    return (
        <div className={classes.Main}>
            <div className={classes.Header}>
                <span className={classes.LogoName}>DIMS</span>
                <div className={classes.ButtonContainer}>
                    <button className={classes.Register}>Register</button>
                    <Link to='/Login'>
                        <button className={classes.Login}>Login</button>
                    </Link>
                </div>
            </div>
            <div className={classes.ContentContainer}>
                <div className={classes.SideBar}>
                    <Link to={'/Login/Members/Tasks'}>
                        <button>Tasks</button>
                    </Link>
                </div>
                <Routes>
                    <Route exact path='/Login' element={<LoginPage />}>
                        <Route path='/Login/Members/' element={<Members />} />
                        <Route exact path='/Login/Members/Tasks' element={<Tasks />} />
                        <Route exact path='/Login/Members/:UserID/Tasks' element={<MembersTasks />} />
                        <Route exact path='/Login/Members/:UserID/TasksTracks/:TaskID' element={<TasksTracks />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
