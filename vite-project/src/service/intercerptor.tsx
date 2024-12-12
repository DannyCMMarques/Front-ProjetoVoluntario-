import axios from 'axios';
import { useEffect } from 'react';
const useApiInterceptor = () => {
  const token = localStorage.getItem('access_token');

  const baseURL = import.meta.env.BASE_URL;

  console.log(111,baseURL);
  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (error.response &&
          error.response.data &&
          error.response.data.error === 'Token inválido') ||
        (error.response &&
          error.response.data &&
          error.response.data.error ===
            'Você não tem permissão para acessar página')
      ) {
        localStorage.removeItem('access_token');
        setTimeout(() => {
          window.location.href = '/login'
        }, 200);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      api.interceptors.request.eject();
      api.interceptors.response.eject();
    };
  }, []);

  return api;
};

export default useApiInterceptor;