import axios from 'axios'

const {
    REACT_APP_API_URL
} = process.env;

export default axios.create({
	baseURL: REACT_APP_API_URL || 'http://127.0.0.1:3333'
});
