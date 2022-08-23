import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.header__title}>Training diary</h1>
            <NavLink to='/training/add-form' className={styles.header__btn}>Add new training</NavLink>
            <NavLink to='/training' className={styles.header__btn}>Show saved trainigs</NavLink>
        </div>
    )
}