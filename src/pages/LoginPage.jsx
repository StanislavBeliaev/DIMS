import React, { useState, useEffect } from 'react';
import fire from '../fire';
import classes from './pages.module.css';

function LoginPage() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Отправлена форма');
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
