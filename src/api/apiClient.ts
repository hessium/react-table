import axios from 'axios';
import {getCookie} from "../shared/utils/cookies.ts";

/*const baseURL = import.meta.env.VITE_BASE_URL;*/
const baseURL = 'https://test.v5.pryaniky.com';

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getCookie('authToken');
    if (token) {
        config.headers['x-auth'] = token;
    }
    return config;
});