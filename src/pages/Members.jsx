import React, { useState } from 'react';
import { Button } from 'components/Buttons/Button/Button';
import { ModalCreate } from 'components/Modal/ModalCreate';
import { Form } from 'components/Form';
import { getDatabase, ref, set, push, child, onValue } from 'firebase/database';

import classes from './pages.module.css';
import '../firebs';
import app from '../firebs';

function Members() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    const database = getDatabase(app);
    const users = ref(database, 'users/');
    //  onValue(users, (snapshot) => {
    //      const data = snapshot.val();
    //      setData(Object.entries(data))
    //  });
    function writeUserData(e) {
        /*eslint no-debugger: 1*/

        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const email = target.email.value;
        const direction = target.direction.value;
        const education = target.education.value;
        const startdate = target.startdate.value;
        const dateofbirth = target.dateofbirth.value;
        console.log(dateofbirth);
        const userId = push(child(ref(database), 'users')).key;
        set(ref(database, 'users/' + userId), {
            name: name,
            email: email,
            direction: direction,
            education: education,
            startdate: startdate,
            dateofbirth: dateofbirth,
        });
    }
    const datatest = [
        { name: 'Lydia', age: 19, educatoin: 'MGAC' },
        { name: 'Artem', age: 19, educatoin: 'MGAC' },
        { name: 'Sasha', age: 25, educatoin: 'MGAC' },
    ];
    return (
        <div className={classes.MembersContainer}>
            <h1 className={classes.MainMembers}>Members</h1>
            <Button className={classes.ButtonCreate} onClick={openModal}>
                Create
            </Button>
            <ModalCreate showModal={showModal} setShowModal={setShowModal}>
                <div className={classes.ModalCreateContainer}>
                    <div className={classes.ModalCreateHeader}>
                        <h2 className={classes.ModalCreateName}>Create member</h2>
                    </div>
                    <div className={classes.ModalCreateContent}>
                        <Form onSubmit={writeUserData}>
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
                                    <td className={classes.Td}>{}</td>
                                    <td className={classes.Td}>{val.educatoin}</td>
                                    <td className={classes.Td}>{}</td>
                                    <td className={classes.Td}>{val.age}</td>
                                    <td className={classes.TdButtons}>
                                        <Button className={classes.ActionButtonTasks}>Tasks</Button>
                                        <Button className={classes.ActionButtonProgress}>Progress</Button>
                                        <Button className={classes.ActionButtonEdit}>Edit</Button>
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
