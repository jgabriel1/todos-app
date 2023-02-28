import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:3000',
});
