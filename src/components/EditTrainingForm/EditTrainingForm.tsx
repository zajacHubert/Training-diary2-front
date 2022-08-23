import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import styles from './EditTrainingForm.module.scss';

import { SimpleExerciseAddToForm } from "../../shared/types/training";
import { editExercise, getSingleTraining } from "../../utils/axios-functions";


type T = keyof SimpleExerciseAddToForm;

export const EditTrainingForm = () => {
    const { title, date } = useParams();
    const [trainingName, setTrainingName] = useState(title as string);
    const [trainingDate, setTrainingDate] = useState(`${new Date(date!).toISOString().slice(0, 10)}`);
    const [inputFields, setInputFields] = useState<SimpleExerciseAddToForm[]>([]);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            const dateArg = new Date(date!);
            const res = await getSingleTraining(title!, dateArg);
            setInputFields(res.data);
        })();
    }, [])

    const changeInputHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const values = [...inputFields];
        values[index][event.target.name as T] = event.target.value;
        setInputFields(values);
    }

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        const newArr = inputFields.map(inputField => (
            {
                ...inputField,
                title: trainingName,
                date: new Date(trainingDate),
            }
        ));

        Promise.all(
            newArr.map(async item => {
                try {
                    await editExercise(item.title, new Date(item.date), item);
                } catch (error) {
                    if (typeof error.response.data.message === 'string')
                        setError(error.response.data.message);
                    else if (Array.isArray(error.response.data.message)) {
                        const errMessage = error.response.data.message.join(', ');
                        setError(errMessage);
                    }
                }
            })
        );
        setRedirect(true);
    }

    return (
        <>
            {redirect && <Navigate to="/training" replace />}
            <div className={styles.add}>
                <h2 className={styles.add__title}>{`Edit training "${title}" performed ${date?.slice(0, 10)}`} </h2>
                <form className={styles.add__form} onSubmit={formSubmitHandler}>
                    <div className={styles.add__subcontainer}>
                        <input
                            type="text"
                            placeholder="Training name"
                            className={styles.add_input}
                            value={trainingName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTrainingName(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Training date"
                            className={styles.add_input}
                            value={trainingDate}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTrainingDate(`${new Date(e.target.value).toISOString().slice(0, 10)}`)}
                        />
                    </div>
                    {
                        inputFields.map((inputField, index: number) => (
                            <div className={styles.add__subcontainer} key={index}>
                                <input
                                    type="text"
                                    name='exerciseName'
                                    className={styles.add_input}
                                    placeholder="Exercise name"
                                    value={inputField.exerciseName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeInputHandler(index, e)}
                                />
                                <input
                                    type="text"
                                    name='reps'
                                    className={styles.add_input}
                                    placeholder="Reps"
                                    value={inputField.reps}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeInputHandler(index, e)}
                                />
                                <input
                                    type="text"
                                    name='weights'
                                    className={styles.add_input}
                                    placeholder="Weights"
                                    value={inputField.weights}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeInputHandler(index, e)}
                                />
                            </div>
                        )
                        )
                    }
                    {error && <p className={styles.edit__p__error}>{error}</p>}
                    <button className={styles.add__btn}>Save</button>
                </form>
            </div>
        </>
    )
}