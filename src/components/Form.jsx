import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Buttons/Button/Button';
import classes from '../pages/pages.module.css';
export const Form = ({ children }) => (
    <form className={classes.Form} action=''>
        <div className={classes.FormContent}>
            <div className={classes.ModalCreateLeft}>
                <label className={classes.FormLeft}>
                    Name
                    <input className={classes.InputSize} type='text' name='Name' placeholder=' Name' required />
                </label>
                <label className={classes.FormLeft}>
                    Last Name
                    <input
                        className={classes.InputSize}
                        type='text'
                        name='Last name'
                        placeholder=' Last name'
                        required
                    />
                </label>
                <label className={classes.FormLeft}>
                    Email
                    <input className={classes.InputSize} type='email' name='Email' placeholder=' Email' required />
                </label>
                <label className={classes.FormLeft}>
                    Direction
                    <select className={classes.InputSize} type='text' name='Direction' placeholder='Ditection'>
                        <option>.Net</option>
                        <option>Java</option>
                        <option>Frontend</option>
                    </select>
                </label>
                <label className={classes.FormLeft}>
                    Sex
                    <select className={classes.InputSize} type='text' name='Sex' placeholder='Sex'>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </label>
                <label className={classes.FormLeft}>
                    Role
                    <input className={classes.InputSize} type='text' name='Role' required />
                </label>
                <label className={classes.FormLeft}>
                    Password
                    <input
                        className={classes.InputSize}
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                    />
                </label>
                <label className={classes.FormLeft}>
                    Confirm password
                    <input
                        className={classes.InputSize}
                        type='email'
                        name='confirm password'
                        placeholder='Password'
                        required
                    />
                </label>
            </div>
            <div className={classes.ModalCrateRight}>
                <label className={classes.FormRight}>
                    Date of Birth
                    <input className={classes.InputSize} type='date' name='date' required />
                </label>
                <label className={classes.FormRight}>
                    Address
                    <input className={classes.InputSize} type='text' name='Address' required />
                </label>
                <label className={classes.FormRight}>
                    Mobile phone
                    <input className={classes.InputSize} type='phone' name='phone' required />
                </label>
                <label className={classes.FormRight}>
                    Skype
                    <input className={classes.InputSize} type='text' name='Direction' required />
                </label>
                <label className={classes.FormRight}>
                    Start date
                    <input className={classes.InputSize} type='text' name='Sex' required />
                </label>
                <label className={classes.FormRight}>
                    Education
                    <input className={classes.InputSize} type='text' name='Role' required />
                </label>
                <label className={classes.FormRight}>
                    University average score
                    <input className={classes.InputSize} type='password' name='password' required />
                </label>
                <label className={classes.FormRight}>
                    Math score
                    <input className={classes.InputSize} type='email' name='confirm password' required />
                </label>
            </div>
        </div>
        <div className={classes.Footer}>{children}</div>
    </form>
);
Form.propTypes = {
    children: PropTypes.node,
};
