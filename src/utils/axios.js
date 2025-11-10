import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://clinicmanagementbackend-production.up.railway.app/api/v1',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      console.error('Unauthorized - Please login again');
    }
    return Promise.reject(error);
  }
);

export default instance;