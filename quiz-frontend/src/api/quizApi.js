import axiosInstance from './axiosInstance';

// Get all quizzes
export const getAllQuizzes = async () => {
    const response = await axiosInstance.get('/quiz');
    return response.data;
};

// Get quiz by ID
export const getQuizById = async (quizId) => {
    const response = await axiosInstance.get(`/quiz/${quizId}`);
    return response.data;
};

// Create quiz (Admin only)
export const createQuiz = async (quizData) => {
    const response = await axiosInstance.post('/quiz', quizData);
    return response.data;
};
