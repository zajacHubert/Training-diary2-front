export interface Exercise {
    id: string;
    title: string;
    date: Date;
    exerciseName: string;
    reps: string;
    weights: string;
}

export interface SearchedTraining {
    trainings_title: string;
    trainings_date: Date;
}

export type Training = Exercise[];

export type SimpleExerciseAddToForm = Omit<Exercise, 'id' | 'date' | 'title'>;
export type ExerciseAddToForm = Omit<Exercise, 'id'>;
export type SearchedTrainingsList = SearchedTraining[];