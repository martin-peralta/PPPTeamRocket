// frontend/src/api.js
import axios from 'axios';

// La URL del backend se tomará de una variable de entorno en producción,
// o usará localhost:5000 en desarrollo.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: baseURL
});

export default apiClient;