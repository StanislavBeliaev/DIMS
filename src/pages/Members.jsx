import React, { useState, useEffect } from 'react';
import { Button } from 'components/Buttons/Button/Button';
import Tasks from './Tasks';
import { Route, Link, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ModalCreate } from 'components/Modal/ModalCreate';
import { ModalEdit } from 'components/Modal/ModalEdit';
import { ModalDelete } from 'components/Modal/ModalDelete';
import { Form } from 'components/Form';
import { getDatabase, ref, set, push, child, onValue, update, remove } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import checkPassword from 'components/checkPassword';
import classes from './pages.module.css';
import '../firebs';
import app from '../firebs';
import { Table } from 'components/Tables/MemberTable';
import PropTypes from 'prop-types';
import { Admin } from 'constants';

function Members({ linkPref }) {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: '',
        lastname: '',
        email: '',
        direction: '',
        sex: '',
        role: '',
        password: '',
        confirmpassword: '',
        dateofbirth: '',
        address: '',
        phone: '',
        skype: '',
        startdate: '',
        education: '',
        university_average_score: '',
        math_score: '',
    });
    const [data, setData] = useState([]);
    const usersData = useSelector((state) => state.fulldata.users);
    const userRole = useSelector((state) => state.user.role);
    const [currentId, setCurrentId] = useState('');
    const opedEdit = (user, id) => {
        setShowEdit((prev) => !prev);
        setCurrentUser(user);
        setCurrentId(id);
    };

    const openDelete = (user, id) => {
        setShowDelete((prev) => !prev);
        setCurrentUser(user);
        setCurrentId(id);
    };

    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    const database = getDatabase(app);
    const auth = getAuth();
    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setData(Object.entries(data));
            }),
        [],
    );

    function writeUserData(e) {
        /*eslint no-debugger: 1*/
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const lastname = target.lastname.value;
        const email = target.email.value;
        const direction = target.direction.value;
        const sex = target.sex.value;
        const role = target.role.value;
        const password = target.password.value;
        const confirmpassword = target.confirmpassword.value;
        const dateofbirth = target.dateofbirth.value;
        const address = target.address.value;
        const phone = target.phone.value;
        const skype = target.skype.value;
        const startdate = target.startdate.value;
        const education = target.education.value;
        const university_average_score = target.university_average_score.value;
        const math_score = target.math_score.value;
        const userId = push(child(ref(database), 'users')).key;
        if (checkPassword(password, confirmpassword)) {
            set(ref(database, 'users/' + userId), {
                name: name,
                lastname: lastname,
                email: email,
                direction: direction,
                sex: sex,
                role: role,
                password: password,
                confirmpassword: confirmpassword,
                dateofbirth: dateofbirth,
                address: address,
                phone: phone,
                skype: skype,
                startdate: startdate,
                education: education,
                university_average_score: university_average_score,
                math_score: math_score,
            });
            createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser);
        }
    }

    function writeNewUserData(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const lastname = target.lastname.value;
        const email = target.email.value;
        const direction = target.direction.value;
        const sex = target.sex.value;
        const role = target.role.value;
        const password = target.password.value;
        const confirmpassword = target.confirmpassword.value;
        const dateofbirth = target.dateofbirth.value;
        const address = target.address.value;
        const phone = target.phone.value;
        const skype = target.skype.value;
        const startdate = target.startdate.value;
        const education = target.education.value;
        const university_average_score = target.university_average_score.value;
        const math_score = target.math_score.value;

        update(ref(database, 'users/' + currentId), {
            name: name,
            lastname: lastname,
            email: email,
            direction: direction,
            sex: sex,
            role: role,
            password: password,
            confirmpassword: confirmpassword,
            dateofbirth: dateofbirth,
            address: address,
            phone: phone,
            skype: skype,
            startdate: startdate,
            education: education,
            university_average_score: university_average_score,
            math_score: math_score,
        });
    }

    function deleteUser() {
        remove(ref(database, 'users/' + currentId));
        setShowDelete(false);
    }

    return (
        <div className={classes.MembersContainer}>
            {/* Modal Window for create member            */}
            <ModalCreate showModal={showModal} setShowModal={setShowModal}>
                <div className={classes.ModalCreateContainer}>
                    <div className={classes.ModalCreateHeader}>
                        <h2 className={classes.ModalCreateName}>Create member</h2>
                    </div>
                    <div className={classes.ModalCreateContent}>
                        <Form onSubmit={writeUserData} user={currentUser} setUser={setCurrentUser}>
                            <Button className={classes.ButtonCreateMember} type='submit'>
                                Create
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowModal(false)}>
                                Back To List
                            </Button>
                        </Form>
                    </div>
                </div>
            </ModalCreate>
            {/* Modal Window for create member */}
            {/* Modal Window for create Editmember */}
            <ModalEdit showEdit={showEdit} setShowEdit={setShowEdit}>
                <div className={classes.ModalCreateContainer}>
                    <div className={classes.ModalCreateHeader}>
                        <h2 className={classes.ModalCreateName}>Edit member</h2>
                    </div>
                    <Form user={currentUser} setUser={setCurrentUser} onSubmit={writeNewUserData}>
                        <Button className={classes.ButtonSave} type='submit'>
                            Save
                        </Button>
                        <Button className={classes.ButtonBack} onClick={() => setShowEdit(false)}>
                            Back To List
                        </Button>
                    </Form>
                </div>
            </ModalEdit>
            {/* Modal Window for create Editmember */}
            <ModalDelete showDelete={showDelete} setShowDelete={setShowDelete}>
                <div className={classes.ModalDeleteContainer}>
                    <div className={classes.ModalDeleteHeader}>
                        <p className={classes.ModalDeleteName}> Delete member </p>
                    </div>
                    <div className={classes.ModalDeleteTextContainer}>
                        <p className={classes.ModalDeleteText}>Are you sure you want to delete the current member ?</p>
                    </div>
                    <div className={classes.ModalDeleteFooter}>
                        <div className={classes.DeleteButtons}>
                            <Button className={classes.ActionButtonDelete} onClick={deleteUser}>
                                Delete
                            </Button>
                            <Button className={classes.ButtonBack} onClick={() => setShowDelete(false)}>
                                Back To List
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalDelete>

            <div className={classes.TableContainer}>
                <div className={classes.TableHeader__container}>
                    <h1 className={classes.MainMembers}>Members</h1>
                    {userRole === Admin ? (
                        <Button className={classes.ButtonCreate} onClick={openModal}>
                            Create
                        </Button>
                    ) : null}
                </div>
                <Table
                    usersData={usersData}
                    openDelete={openDelete}
                    opedEdit={opedEdit}
                    linkPref={linkPref}
                    userRole={userRole}
                />
            </div>
        </div>
    );
}

Members.propTypes = {
    Table: PropTypes.func,
    linkPref: PropTypes.string,
};
Members.defaultProps = {};
export default Members;
