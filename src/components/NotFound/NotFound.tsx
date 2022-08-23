import React from "react";
import { NavLink } from "react-router-dom";
import styles from './NotFound.module.scss';

export const NotFound = () => {

    return (
        <div className={styles['not-found']}>
            <h2 className={styles['not-found__title']}>Page not found</h2>
            <p className={styles['not-found__p']}>Do you want to go back to the home page?</p>
            <NavLink to='/training/add-form' className={styles['not-found__btn']}>home page</NavLink>
        </div >
    )
}