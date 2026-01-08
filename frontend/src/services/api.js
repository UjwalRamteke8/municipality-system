// frontend/services/api.js
import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  // Ensure your .env VITE_API_BASE_URL ends with /api
  // e.g., https://municipality-system.onrender.com/api
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
