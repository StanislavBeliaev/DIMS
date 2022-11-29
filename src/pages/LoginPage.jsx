import React, { useState, useEffect, useContext } from 'react';
import { FulldataContext } from 'App/App';
import { Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { UserFormSVG } from 'SVG/UserFormSVG';
import { PassFromSVG } from 'SVG/PassFormSVG';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserProfile } from 'features/counter/userSlice';
import PropTypes from 'prop-types';
import classes from './pages.module.css';
import { initializeApp } from 'firebase/app';
import { useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import App from 'App/App';
import app from '../firebs';

function LoginPage({ login, setLogin, accToken, setAccToken, userRole, setUserRole }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const fulldata = useSelector((state) => state.fulldata);
    function getUserProfile(email, users) {
        let [key, currentUser] = Object.entries(users).find(([key, currentUser]) => currentUser.email === email);
        return { id: key, ...currentUser };
    }

    // console.log(fulldata)
    // console.log(Object.values(data.users).find(currentUser => currentUser.email === "777vaka777@mail.ru").role)
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
                let currentUser = getUserProfile(userCredential._tokenResponse.email, fulldata.users);
                // console.log(currentUser)
                // console.log(Object.values(fulldata.users).find(currentUser => currentUser.email === userCredential._tokenResponse.email).role)
                // ...
                dispatch(setUserProfile(currentUser));

                if (currentUser.role === 'Admin') {
                    // navigate('/Login/Members/'+ currentUser.id+'/Tasks');
                    navigate('/Members/');
                }
                if (currentUser.role === 'Mentor') {
                    navigate('/Mentor/');
                }
                if (currentUser.role === 'Member') {
                    navigate('/Member/' + currentUser.id + '/Tasks');
                }
            })

            .catch((error) => {
                console.log(error);
            });
    }

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
    userRole: PropTypes.string,
    setUserRole: PropTypes.string,
};
export default LoginPage;
