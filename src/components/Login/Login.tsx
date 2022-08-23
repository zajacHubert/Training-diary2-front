import React, { useState } from "react";
import styles from './Login.module.scss';
import { signin } from "../../utils/axios-functions";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signinError, setSigninError] = useState('');
    const [redirect, setRedirect] = useState(false);


    const handleFormSubmit = async (e: React.FormEvent, type: string) => {
        e.preventDefault();
        try {
            await signin(username, password);
            setUsername('');
            setPassword('');
            setRedirect(true);
        } catch (error) {
            if (typeof error.response.data.message === 'string')
                setSigninError(error.response.data.message);
            else if (Array.isArray(error.response.data.message)) {
                const errMessage = error.response.data.message.join(', ');
                setSigninError(errMessage);
            }
        }
    }


    return (
        <>
            {redirect && <Navigate to="/training/add-form" replace />}
            <div className={styles.login}>
                <h2 className={styles.title}>Sign in</h2>
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
                    <button className={styles.login__btn} onClick={e => handleFormSubmit(e, 'signin')}>sign in</button>
                    {signinError && <p className={styles.login__p__error}>{signinError}</p>}
                    <p className={styles.login__p}>Don't have an account?<Link to="/signup" style={{ textDecoration: 'none' }}><span className={styles.login__span}>Sign up</span></Link></p>

                </form>



            </div>
        </>

    )
}