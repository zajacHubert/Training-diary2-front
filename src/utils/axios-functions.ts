import axios from "axios";
import { ExerciseAddToForm } from '../shared/types/training';

export const getAllTrainings = async () => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.get('http://localhost:3001/trainings', config);
    return res;
}

export const signup = async (username: string, password: string) => {
    await axios.post('http://localhost:3001/auth/signup', {
        username,
        password,
    });
}

export const signin = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:3001/auth/signin', {
        username,
        password,
    });
    localStorage.setItem('jwt', res.data.accessToken);
}

export const saveExercise = async (exercise: ExerciseAddToForm) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    await axios.post('http://localhost:3001/trainings', exercise, config);
}

export const deleteTraining = async (title: string, date: Date) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.delete(`http://localhost:3001/trainings/${title}/${date}`, config);
    return res;
}

export const getSingleTraining = async (title: string, date: Date) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.get(`http://localhost:3001/trainings/${title}/${date}`, config);
    return res;
}

export const editExercise = async (title: string, date: Date, exercise: ExerciseAddToForm) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    await axios.patch(`http://localhost:3001/trainings/${title}/${date}`, exercise, config);
}

