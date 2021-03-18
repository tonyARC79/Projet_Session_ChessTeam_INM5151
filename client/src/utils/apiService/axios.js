import axios from 'axios';

const API_URL = "http://localhost:5000"


export default axios.create({
    baseURL: API_URL,
    proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 5000
    },
})