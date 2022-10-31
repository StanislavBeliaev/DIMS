import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
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
    const svgStyle = {
        color: 'blue',
    };
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
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-person-circle'
                                        viewBox='0 0 16 16'
                                        style={svgStyle}
                                    >
                                        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                        <path
                                            fillRule='evenodd'
                                            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                        />
                                    </svg>
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
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-shield-lock'
                                        viewBox='0 0 16 16'
                                        style={svgStyle}
                                    >
                                        <path d='M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z' />
                                        <path d='M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z' />
                                    </svg>
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
};
export default LoginPage;
