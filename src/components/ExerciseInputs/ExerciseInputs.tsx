import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import styles from './ExerciseInputs.module.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { SimpleExerciseAddToForm } from "../../shared/types/training";


interface Props {
    inputFields: SimpleExerciseAddToForm[];
    changeInputHandler: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
    removeFieldHandler: (index: number) => void;
    addFieldHandler: () => void;
}

export const ExerciseInputs = ({ inputFields, changeInputHandler, removeFieldHandler, addFieldHandler }: Props) => {

    const [width, setWitdth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = useCallback(() => {
        setWitdth(window.innerWidth);
        setIsMobile(width < 768);

    }, [window.innerWidth]);

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
    }, [handleResize]);


    return (
        <>
            {!isMobile && inputFields.map((inputField, index: number) => (
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
                    <AiOutlinePlus
                        className={styles.add__icon}
                        onClick={addFieldHandler}
                    />
                    <AiOutlineMinus
                        className={styles.add__icon}
                        onClick={() => removeFieldHandler(index)}
                    />
                </div>
            )
            )}

            {isMobile && inputFields.map((inputField, index: number) => (
                <div className={styles.add__mobile} key={index}>
                    <div className={styles.mobile__input}>
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
                    <div className={styles.mobile__icon}>
                        <AiOutlinePlus
                            className={styles.add__icon}
                            onClick={addFieldHandler}
                        />
                        <AiOutlineMinus
                            className={styles.add__icon}
                            onClick={() => removeFieldHandler(index)}
                        />
                    </div>
                </div>
            )
            )}

        </>
    )
} 