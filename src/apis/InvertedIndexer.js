import axios from 'axios';

export default axios.create({
    baseURL: 'https://zq-ir-core.herokuapp.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});