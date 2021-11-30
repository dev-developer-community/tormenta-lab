import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: process.env.BACKEND_API_URL
});

export default api;
