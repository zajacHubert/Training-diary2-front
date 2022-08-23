import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './SingleTraining.module.scss';

import { getSingleTraining } from "../../utils/axios-functions";
import { Training } from "../../shared/types/training";

export const SingleTraining = () => {

    const { title, date } = useParams();
    const [training, setTraining] = useState<Training | null>(null);

    const dateArg = new Date(date!);

    useEffect(() => {
        (async () => {
            const res = await getSingleTraining(title!, dateArg);
            setTraining(res.data);
        })();
    }, [])

    if (training === null) {
        return <p>Loading...</p>
    }


    return (
        <div className={styles.list}>
            <h2 className={styles.add__title}>{`Your training "${title}" performed ${date?.slice(0, 10)}`} </h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table__header}>
                        <th className={styles.table__header}>Exercise number</th>
                        <th className={styles.table__header}>Exercise name</th>
                        <th className={styles.table__header}>Reps</th>
                        <th className={styles.table__header}>Weights</th>
                    </tr>
                </thead>
                <tbody>
                    {training.map((el, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.exerciseName}</td>
                            <td>{el.reps}</td>
                            <td>{el.weights}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}