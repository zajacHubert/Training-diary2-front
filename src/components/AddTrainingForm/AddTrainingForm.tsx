import React, { ChangeEvent, FormEvent, useState } from "react";
import { SimpleExerciseAddToForm } from '../../shared/types/training';
import { ExerciseInputs } from "../ExerciseInputs/ExerciseInputs";
import styles from './AddTrainingForm.module.scss';
import { saveExercise } from '../../utils/axios-functions';

type T = keyof SimpleExerciseAddToForm;

export const AddTrainingForm = () => {
    const [trainingName, setTrainingName] = useState('');
    const [trainingDate, setTrainingDate] = useState(`${new Date().toISOString().slice(0, 10)}`);
    const [inputFields, setInputFields] = useState<SimpleExerciseAddToForm[]>([
        {
            exerciseName: '',
            reps: '',
            weights: '',
        },
    ]);
    const [error, setError] = useState('');

    const changeInputHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const values = [...inputFields];
        values[index][event.target.name as T] = event.target.value;
        setInputFields(values);
    }

    const addFieldHandler = () => {
        setInputFields([...inputFields, {
            exerciseName: '',
            reps: '',
            weights: '',
        }])
    }

    const removeFieldHandler = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const newArr = inputFields.map(inputField => (
            {
                ...inputField,
                title: trainingName,
                date: trainingDate,
            }
        ));

        Promise.all(
            newArr.map(async item => {
                try {
                    await saveExercise({
                        ...item,
                        date: new Date(item.date),
                    })
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

        setInputFields([
            {
                exerciseName: '',
                reps: '',
                weights: '',
            },
        ]);
        setTrainingDate(new Date().toDateString().slice(0, 10));
        setTrainingName('');
    }



    return (
        <>
            <div className={styles.add}>
                <h2 className={styles.add__title}>Add training to your diary </h2>
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
                    <ExerciseInputs
                        inputFields={inputFields}
                        changeInputHandler={changeInputHandler}
                        addFieldHandler={addFieldHandler}
                        removeFieldHandler={removeFieldHandler}

                    />
                    {error && <p className={styles.add__p__error}>{error}</p>}
                    <button className={styles.add__btn}>Save</button>
                </form>
            </div>
        </>
    )

}