import axiosInstance from './axiosInstance';

// Submit a quiz attempt
export const submitAttempt = async (quizId, answers) => {
    const response = await axiosInstance.post('/attempt', {quizId, answers});
    return response.data;
};

// Get all attempts for the logged-in user
export const getAllAttempts = async () => {
    const response = await axiosInstance.get('/attempt');
    return response.data;
};

// Get attempts by quiz ID
export const getAttemptsByQuiz = async (quizId) => {
    const response = await axiosInstance.get(`/attempt/quiz/${quizId}`);
    return response.data;
};
