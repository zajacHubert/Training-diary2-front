import React, { useEffect, useState } from "react";
import { SearchedTrainingsList } from "../../shared/types/training";
import { getAllTrainings } from '../../utils/axios-functions';
import { Spinner } from "../Spinner/Spinner";
import { TrainingsTable } from "../TrainingsTable/TrainingsTable";
import styles from './TrainingsList.module.scss';


export const TrainingsList = () => {
    const [trainings, setTrainings] = useState<SearchedTrainingsList | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            await loadTrainings();
        })()
    }, []);

    const loadTrainings = async () => {
        try {
            const res = await getAllTrainings();
            setTrainings(res.data);
        } catch (error) {
            if (typeof error.response.data.message === 'string')
                setError(error.response.data.message);
            else if (Array.isArray(error.response.data.message)) {
                const errMessage = error.response.data.message.join(', ');
                setError(errMessage);
            }
        }

    }

    if (trainings === null) {
        return <Spinner />
    }

    if (trainings.length === 0) {
        return (
            <div className={styles.list}>
                <h2>You have not saved any training yet</h2>
            </div>
        )
    }

    return (
        <div className={styles.list}>
            <h2 className={styles.list__title}>Your trainings list</h2>
            <TrainingsTable trainings={trainings} loadTrainings={loadTrainings} />
            {error && <p className={styles.list__p__error}>{error}</p>}
        </div>
    );
}