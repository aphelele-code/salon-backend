// src/config.js
const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000'
    : 'https://salon-backend-1-68nl.onrender.com';

export default API_URL;
