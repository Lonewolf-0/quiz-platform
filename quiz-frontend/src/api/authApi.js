import axiosInstance from './axiosInstance';

// Register a new user
export const register = async (email, password) => {
    const response = await axiosInstance.post('/auth/register', {email, password});
    return response.data;
};

// Login user
export const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {email, password});
    return response.data;
};

// Get current logged-in user
export const getMe = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
};
