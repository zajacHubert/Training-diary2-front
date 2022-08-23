import React, { useState } from "react";
import { SearchedTrainingsList } from "../../shared/types/training";
import { BiShow } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { deleteTraining } from '../../utils/axios-functions';
import styles from './TrainingsTable.module.scss';
import { Dialog } from '../Dialog/Dialog';

interface Props {
    trainings: SearchedTrainingsList;
    loadTrainings: () => void;
}


export const TrainingsTable = ({ trainings, loadTrainings }: Props) => {

    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [error, setError] = useState('');


    const handleDelete = (title: string, date: Date) => {
        setTitle(title);
        setDate(date);
        setShowDialog(true);
    }

    const removeTraining = async (title: string, date: Date) => {

        try {
            const res = await deleteTraining(title, date);
            if (res.data.isSuccess) {
                await loadTrainings();
            }
        } catch (error) {
            if (typeof error.response.data.message === 'string')
                setError(error.response.data.message);
            else if (Array.isArray(error.response.data.message)) {
                const errMessage = error.response.data.message.join(', ');
                setError(errMessage);
            }
        }


    }


    return (
        <>
            {showDialog && <Dialog
                title={title}
                date={date}
                setShowDialog={setShowDialog}
                removeTraining={removeTraining}
            />}
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table__header}>
                        <th className={styles.table__header}>Training number</th>
                        <th className={styles.table__header}>Training name</th>
                        <th className={styles.table__header}>Training date</th>
                        <th className={styles.table__header}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.map((training, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{training.trainings_title}</td>
                            <td>{new Date(training.trainings_date).toLocaleString().slice(0, 10)}</td>
                            <td>
                                <div className={styles.icons__container}>
                                    <Link
                                        to={`/training/${training.trainings_title}/${training.trainings_date}`}
                                        className={styles.icons}
                                    >
                                        <BiShow className={styles.icons} />
                                    </Link>
                                    <Link to={`/training/edit-form/${training.trainings_title}/${training.trainings_date}`}>
                                        <MdEdit className={styles.icons} />
                                    </Link>

                                    <MdDelete className={styles.icons} onClick={() => handleDelete(training.trainings_title, training.trainings_date)} />
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
            {error && <p className={styles.delete__p__error}>{error}</p>}
        </>
    );
}