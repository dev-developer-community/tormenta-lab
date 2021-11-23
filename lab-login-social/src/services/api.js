import axios from "axios";

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: "http://localhost:8080/api/v1/",
});

export default api;