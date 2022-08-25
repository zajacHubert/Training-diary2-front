import axios from "axios";
import { ExerciseAddToForm } from '../shared/types/training';

const isDev = process.env.NODE_ENV === 'development';

const baseUrl = isDev ? 'http://localhost:3001' : 'https://training-diary-hubert.herokuapp.com';

export const getAllTrainings = async () => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.get(`${baseUrl}/trainings`, config);
    return res;
}

export const signup = async (username: string, password: string) => {
    await axios.post(`${baseUrl}/auth/signup`, {
        username,
        password,
    });
}

export const signin = async (username: string, password: string) => {
    const res = await axios.post(`${baseUrl}/auth/signin`, {
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
    await axios.post(`${baseUrl}/trainings`, exercise, config);
}

export const deleteTraining = async (title: string, date: Date) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.delete(`${baseUrl}/trainings/${title}/${date}`, config);
    return res;
}

export const getSingleTraining = async (title: string, date: Date) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.get(`${baseUrl}/trainings/${title}/${date}`, config);
    return res;
}

export const editExercise = async (title: string, date: Date, exercise: ExerciseAddToForm) => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    await axios.patch(`${baseUrl}/trainings/${title}/${date}`, exercise, config);
}

