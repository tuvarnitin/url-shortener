import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
    withCredentials: true // Important for cookies
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and it's not a retry and not a refresh token request
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refresh')
        ) {
            originalRequest._retry = true;

            try {
                // Call refresh token endpoint
                await api.post('/api/auth/user/refresh');

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear user data and redirect to login
                localStorage.removeItem('userid');
                toast.error('Session expired. Please login again.');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;