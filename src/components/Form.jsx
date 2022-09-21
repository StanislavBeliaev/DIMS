import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Buttons/Button/Button';
import classes from '../pages/pages.module.css';
export const Form = ({ children, onSubmit, user, setUser }) => {
    return (
        <form className={classes.Form} onSubmit={onSubmit}>
            <div className={classes.FormContent}>
                <div className={classes.ModalCreateLeft}>
                    <label className={classes.FormLeft}>
                        Name
                        <input
                            className={classes.InputSize}
                            type='text'
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            name='name'
                            placeholder=' Name'
                            required
                        />
                    </label>
                    <label className={classes.FormLeft}>
                        Last Name
                        <input
                            className={classes.InputSize}
                            type='text'
                            name='lastname'
                            placeholder=' Last name'
                            required
                            value={user.lastname}
                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                        />
                    </label>
                    <label className={classes.FormLeft}>
                        Email
                        <input
                            className={classes.InputSize}
                            type='email'
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            name='email'
                            placeholder=' Email'
                            required
                        />
                    </label>
                    <label className={classes.FormLeft}>
                        Direction
                        <select
                            className={classes.InputSize}
                            type='text'
                            onChange={(e) => setUser({ ...user, direction: e.target.value })}
                            value={user.direction}
                            name='direction'
                            placeholder='Ditection'
                        >
                            <option>.Net</option>
                            <option>Java</option>
                            <option>Frontend</option>
                        </select>
                    </label>
                    <label className={classes.FormLeft}>
                        Sex
                        <select
                            className={classes.InputSize}
                            type='text'
                            onChange={(e) => setUser({ ...user, sex: e.target.value })}
                            value={user.sex}
                            name='sex'
                            placeholder='Sex'
                        >
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </label>
                    <label className={classes.FormLeft}>
                        Role
                        <select
                            className={classes.InputSize}
                            type='text'
                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                            value={user.role}
                            name='role'
                            required
                        >
                            <option value='Member'>Member</option>
                            <option value='Member'>Admin</option>
                            <option value='Member'>Mentor</option>
                        </select>
                    </label>
                    <label className={classes.FormLeft}>
                        Password
                        <input
                            className={classes.InputSize}
                            type='password'
                            name='password'
                            placeholder='Password'
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </label>
                    <label className={classes.FormLeft}>
                        Confirm password
                        <input
                            className={classes.InputSize}
                            type='password'
                            name='confirmpassword'
                            placeholder='Password'
                            required
                            value={user.confirmpassword}
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                        />
                    </label>
                </div>
                <div className={classes.ModalCrateRight}>
                    <label className={classes.FormRight}>
                        Date of Birth
                        <input
                            className={classes.InputSize}
                            type='date'
                            onChange={(e) => setUser({ ...user, dateofbirth: e.target.value })}
                            value={user.dateofbirth}
                            name='dateofbirth'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Address
                        <input
                            className={classes.InputSize}
                            type='text'
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            value={user.address}
                            name='address'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Mobile phone
                        <input
                            className={classes.InputSize}
                            type='phone'
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            value={user.phone}
                            name='phone'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Skype
                        <input
                            className={classes.InputSize}
                            type='text'
                            value={user.skype}
                            onChange={(e) => setUser({ ...user, skype: e.target.value })}
                            name='skype'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Start date
                        <input
                            className={classes.InputSize}
                            type='date'
                            value={user.startdate}
                            onChange={(e) => setUser({ ...user, startdate: e.target.value })}
                            name='startdate'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Education
                        <input
                            className={classes.InputSize}
                            type='text'
                            value={user.education}
                            onChange={(e) => setUser({ ...user, education: e.target.value })}
                            name='education'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        University average score
                        <input
                            className={classes.InputSize}
                            type='text'
                            value={user.university_average_score}
                            onChange={(e) => setUser({ ...user, university_average_score: e.target.value })}
                            name='university_average_score'
                            required
                        />
                    </label>
                    <label className={classes.FormRight}>
                        Math score
                        <input
                            className={classes.InputSize}
                            type='text'
                            value={user.math_score}
                            onChange={(e) => setUser({ ...user, math_score: e.target.value })}
                            name='math_score'
                            required
                        />
                    </label>
                </div>
            </div>
            <div className={classes.Footer}>{children}</div>
        </form>
    );
};
Form.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    onClick: PropTypes.func,
    user: PropTypes.object,
    setUser: PropTypes.func,
};
