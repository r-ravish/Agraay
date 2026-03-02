import axios from 'axios';

// Create an axios instance with the base URL configured
// This will use the environment variable if present, falling back to localhost for development
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://agraay-backend.onrender.com' : 'http://localhost:5000'),
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
