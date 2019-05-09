import axios from 'axios';

const $axios = axios.create({
    baseURL: "http://localhost:5001/api/v1"
});

export default $axios;