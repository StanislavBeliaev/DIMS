import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import classes from './pages.module.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebs';

function LoginPage() {
    const [accToken, setAccToken] = useState({ token: '' });
    let navigate = useNavigate();
    function handleSubmit(e) {
        /*eslint no-debugger: 1*/
        e.preventDefault();
        const auth = getAuth(app);
        const target = e.target;
        const email = target.email.value;
        const password = target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setAccToken({ token: userCredential.user.accessToken });

                console.log(userCredential);
                // ...
                navigate('/Login/Members');
            })

            .catch((error) => {
                console.log(error);
            });
    }
    if (accToken.token) {
        return <Outlet />;
    }

    return (
        <div className={classes.LoginPage__Container}>
            <h1 className={classes.SignIn}>Sign In</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Username: </label>
                    <input type='email' name='email' placeholder='email' required />
                    <label>Password: </label>
                    <input type='password' name='password' placeholder='password' required />
                    <input type='submit' />
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
