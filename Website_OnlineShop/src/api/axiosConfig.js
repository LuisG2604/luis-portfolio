// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erreur avec la reponse:', error.response.data);
    } else {
      console.error('Erreur avec la connexion au serveur:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
