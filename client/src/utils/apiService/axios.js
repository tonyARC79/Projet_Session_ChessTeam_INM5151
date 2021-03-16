import axios from 'axios';

const API_URL = "http://localhost:5000"

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    devServer: {
        proxy: 'http://localhost:5000'
    }
})