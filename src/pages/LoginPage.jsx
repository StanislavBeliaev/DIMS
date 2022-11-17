import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { UserFormSVG } from 'SVG/UserFormSVG';
import { PassFromSVG } from 'SVG/PassFormSVG';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './pages.module.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import App from 'App/App';
import app from '../firebs';

function LoginPage({ login, setLogin, accToken, setAccToken }) {
    let navigate = useNavigate();
    function getUserProfile(email) {
        return {
            role: 'mentor',
        };
    }

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
                setLogin(true);

                // ...
                if (getUserProfile().role === 'admin') {
                    navigate('/Login/Members/-NCV1nUF1ugaBxvVtsUI/Tasks');
                } else {
                    navigate('/Login/Members');
                }
            })

            .catch((error) => {});
    }
    // if (accToken.token) {
    //     return <Outlet />;
    // }else{
    //    <Navigate to='/'/>
    // }

    return (
        <div className={classes.LoginPage__Container}>
            <div className={classes.LoginForm__ContainerGlobal}>
                <div className={classes.LoginForm__Container}>
                    <div className={classes.LoginForm__Header}>
                        <h1 className={classes.LoginForm__LogoName}>
                            <div className={classes.LoginForm__Logo}></div>
                            DIMS
                        </h1>
                    </div>
                    <div className={classes.LoginForm__Form}>
                        <div className={classes.LoginForm__Name}>
                            <h1 style={{ color: '#8492af' }}>
                                Welcome <span style={{ color: '#5384ff' }}>back</span>
                            </h1>
                        </div>
                        <Form onSubmit={handleSubmit} className={classes.LoginForm}>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <div className={classes.Form__svg__container}>
                                    <UserFormSVG />
                                    <Form.Control
                                        type='email'
                                        className={classes.form__control}
                                        name='email'
                                        placeholder='Enter email'
                                    ></Form.Control>
                                </div>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <div className={classes.Form__svg__container}>
                                    <PassFromSVG />
                                    <Form.Control
                                        type='password'
                                        className={classes.form__control}
                                        name='password'
                                        placeholder='Password'
                                    />
                                </div>
                            </Form.Group>
                            <Button variant='primary' type='submit' className={classes.Button__enter}>
                                Enter
                            </Button>
                        </Form>
                        {/* <form onSubmit={handleSubmit}>
                    <label>Username: </label>
                    <input type='email' name='email' placeholder='email' required />
                    <label>Password: </label>
                    <input type='password' name='password' placeholder='password' required />
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
LoginPage.propTypes = {
    login: PropTypes.bool,
    setLogin: PropTypes.func,
    accToken: PropTypes.object,
    setAccToken: PropTypes.func,
    shouldRedirect: PropTypes.bool,
    setShouldRedirect: PropTypes.func,
};
export default LoginPage;
