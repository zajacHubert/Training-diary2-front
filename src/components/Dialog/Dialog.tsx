import React, { Dispatch } from "react";
import styles from './Dialog.module.scss';
interface Props {
    title: string;
    date: Date | null;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    removeTraining: (title: string, date: Date) => Promise<void>
}

export const Dialog = ({ setShowDialog, removeTraining, title, date }: Props) => {

    const confirmDelete = (title: string, date: Date) => {
        removeTraining(title, date);
        setShowDialog(false);
    }

    return (
        <div className={styles.overlay} >
            <div className={styles.dialog}>
                <h2 className={styles.dialog__title}>Are you sure to delete thie training?</h2>
                <button
                    className={styles.dialog__btn}
                    onClick={() => confirmDelete(title, date!)}
                >
                    Yes
                </button>
                <button
                    className={styles.dialog__btn}
                    onClick={() => setShowDialog(false)}
                >
                    No
                </button>
            </div >
        </div >
    )
}

