import React from 'react';
import { Route, Link } from 'react-router-dom';
import Members from '../pages/Members';
import MembersProgress from '../pages/MemberProgress';
import MembersTasks from '../pages/MemberTasks';
import LoginPage from '../pages/LoginPage';
import classes from './App.module.css';

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
                <div className={classes.SideBar}>SideBar</div>
                <Route exact path='/Login' component={LoginPage} />
                <Route exact path='/Members' component={Members} />
                <Route exact path='/MembersProgress' component={MembersProgress} />
                <Route exact path='/MembersTasks' component={MembersTasks} />
            </div>
        </div>
    );
}

export default App;
