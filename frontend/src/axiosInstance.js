import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL,
  // You can add other Axios configurations here if needed
});

export default instance;
