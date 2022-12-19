import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from '../App/App.module.css';
import { HomeSVG } from 'SVG/HomeSVG';
import { MemberSVG } from 'SVG/MemberSVG';
import { TasksSVG } from 'SVG/TasksSVG';
import { AboutUsSVG } from 'SVG/AboutUS';

const rolesToLinks = {
    Admin: [
        { link: '/Tasks/', label: 'Tasks', icon: <TasksSVG /> },
        { link: '/Members/', label: 'Members', icon: <MemberSVG /> },
        { link: '/', label: 'Home', icon: <HomeSVG /> },
        { link: '/', label: 'About Us', icon: <AboutUsSVG /> },
    ],
    Mentor: [
        { link: '/MentorTasks/', label: 'Tasks', icon: <TasksSVG /> },
        { link: '/MentorMembers/', label: 'Members', icon: <MemberSVG /> },
        { link: '/', label: 'Home', icon: <HomeSVG /> },
        { link: '/', label: 'About Us', icon: <AboutUsSVG /> },
    ],
};
export const SideBar = ({ burgerStatus, setBurgerStatus, userRole }) => {
    return (
        <>
            {rolesToLinks[userRole] && burgerStatus ? (
                <div className={classes.SideBar}>
                    {rolesToLinks[userRole].map(({ link, label, icon }, idx) => (
                        <Link to={link} key={idx}>
                            <div className={classes.SideBarButtonsContainer}>
                                {icon}
                                <button className={classes.BurgerButtons}>{label}</button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </>
    );
};
SideBar.propTypes = {
    burgerStatus: PropTypes.bool,
    setBurgerStatus: PropTypes.func,
    userRole: PropTypes.string,
};
