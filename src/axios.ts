import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL
});

export default apiClient;
