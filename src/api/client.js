import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // '' usa o proxy do Vite
  headers: { 'Content-Type': 'application/json' }
});

export default api;