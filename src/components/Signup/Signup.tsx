import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signin, signup } from "../../utils/axios-functions";
import { Modal } from "../Modal/Modal";
import styles from './Signup.module.scss';

export const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);


    const handleFormSubmit = async (e: React.FormEvent, type: string) => {
        e.preventDefault();
        try {
            await signup(username, password);
            await signin(username, password);
            setUsername('');
            setPassword('');
            setShow(true);

        } catch (error) {

            if (typeof error.response.data.message === 'string')
                setSignupError(error.response.data.message);
            else if (Array.isArray(error.response.data.message)) {
                const errMessage = error.response.data.message.join(', ');
                setSignupError(errMessage);
            }
        }
    }


    return (
        <>
            {show && <Modal setShow={setShow} setRedirect={setRedirect} />}
            {redirect && <Navigate to="/training/add-form" replace />}
            <div className={styles.login}>
                <h2 className={styles.title}>Sign up</h2>
                <form className={styles.login__form}>
                    <label className={styles.login__label}>Username
                        <input
                            type="text"
                            className={styles.login__input}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                    <label
                        className={styles.login__label}>Password
                        <input
                            type="password"
                            className={styles.login__input}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                    <button className={styles.login__btn} onClick={e => handleFormSubmit(e, 'signin')}>sign up</button>
                    {signupError && <p className={styles.login__p__error}>{signupError}</p>}
                    <p className={styles.login__p}>Already have an account?<Link to="/" style={{ textDecoration: 'none' }}><span className={styles.login__span}>Sign in</span></Link></p>
                </form>
            </div>
        </>

    )
}