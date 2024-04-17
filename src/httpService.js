// httpService.js
import axios from "axios";

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Обрабатываем ошибку здесь
      // Возвращаем Promise.reject, чтобы пробросить ошибку дальше
      return Promise.reject(error);
    }
  );
};
