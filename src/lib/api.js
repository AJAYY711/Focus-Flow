import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to headers automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally (e.g., auto logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only trigger if we are not already logging out
      if (!window.location.pathname.includes('/login')) {
         Cookies.remove('auth_token');
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
