import React, { useState, useEffect } from 'react';
import { Button } from 'components/Buttons/Button/Button';
import { ModalCreate } from 'components/Modal/ModalCreate';
import { ModalEdit } from 'components/Modal/ModalEdit';
import { Form } from 'components/Form';
import { getDatabase, ref, set, push, child, onValue, update } from 'firebase/database';
import checkPassword from 'components/checkPassword';
import classes from './pages.module.css';
import '../firebs';
import app from '../firebs';
import { SaveButton } from 'components/Buttons/SaveButton/SaveButton';

function Members() {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
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
    const [currentId, setCurrentId] = useState('');
    const opedEdit = (user, id) => {
        setShowEdit((prev) => !prev);
        setCurrentUser(user);
        setCurrentId(id);
    };
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    const database = getDatabase(app);
    const users = ref(database, 'users/');
    useEffect(
        () =>
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                setData(Object.entries(data));
            }),
        [],
    );

    console.log(database);
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
        }
    }
    // const datatest = [
    //     { name: 'Lydia', age: 19, educatoin: 'MGAC' },
    //     { name: 'Artem', age: 19, educatoin: 'MGAC' },
    //     { name: 'Sasha', age: 25, educatoin: 'MGAC' },
    // ];

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

    return (
        <div className={classes.MembersContainer}>
            <h1 className={classes.MainMembers}>Members</h1>
            <Button className={classes.ButtonCreate} onClick={openModal}>
                Create
            </Button>
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
            <ModalEdit showEdit={showEdit} setShowEdit={setShowEdit}>
                <div className={classes.ModalCreateContainer}>
                    <div className={classes.ModalCreateHeader}>
                        <h2 className={classes.ModalCreateName}>Edit member</h2>
                    </div>
                    <Form user={currentUser} setUser={setCurrentUser} onSubmit={writeNewUserData}>
                        <Button className={classes.ButtonCreateMember} type='submit'>
                            Save
                        </Button>
                        <Button className={classes.ButtonBack} onClick={() => setShowEdit(false)}>
                            Back To List
                        </Button>
                    </Form>
                </div>
            </ModalEdit>
            <div className={classes.TableContainer}>
                <table className={classes.Table}>
                    <tbody>
                        <tr className={classes.Tr}>
                            <th className={classes.Th}>#</th>
                            <th className={classes.Th}>Full Name</th>
                            <th className={classes.Th}>Direction</th>
                            <th className={classes.Th}>Education</th>
                            <th className={classes.Th}>Start</th>
                            <th className={classes.Th}>Age</th>
                            <th className={classes.Th}>Action</th>
                        </tr>
                        {data.map(([id, val], idx) => {
                            return (
                                <tr key={id} className={classes.TrData}>
                                    <td className={classes.Td}>{idx + 1}</td>
                                    <td className={classes.Td}>{val.name}</td>
                                    <td className={classes.Td}>{val.direction}</td>
                                    <td className={classes.Td}>{val.education}</td>
                                    <td className={classes.Td}>{val.startdate}</td>
                                    <td className={classes.Td}>{val.dateofbirth}</td>
                                    <td className={classes.TdButtons}>
                                        <Button className={classes.ActionButtonTasks}>Tasks</Button>
                                        <Button className={classes.ActionButtonProgress}>Progress</Button>
                                        <Button className={classes.ActionButtonEdit} onClick={() => opedEdit(val, id)}>
                                            Edit
                                        </Button>
                                        <Button className={classes.ActionButtonDelete}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Members.propTypes = {};
Members.defaultProps = {};
export default Members;
