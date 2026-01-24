import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAllQuizzes} from '../api/quizApi';
import './Quizzes.css';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const data = await getAllQuizzes();
            setQuizzes(data);
        } catch (err) {
            setError('Failed to load quizzes. Please try again later.');
            console.error('Error fetching quizzes:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="quizzes-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading quizzes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quizzes-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={fetchQuizzes} className="retry-btn">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quizzes-page">
            <div className="quizzes-container">
                <div className="quizzes-header">
                    <h1>Available Quizzes</h1>
                    <p>Choose a quiz to test your knowledge</p>
                </div>

                {quizzes.length === 0 ? (
                    <div className="no-quizzes">
                        <div className="no-quizzes-icon">📭</div>
                        <h2>No Quizzes Available</h2>
                        <p>Check back later for new quizzes!</p>
                    </div>
                ) : (
                    <div className="quizzes-grid">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-card">
                                <div className="quiz-card-header">
                                    <span className="quiz-icon">📝</span>
                                    <h3>{quiz.title}</h3>
                                </div>
                                <p className="quiz-description">{quiz.description}</p>
                                <div className="quiz-meta">
                  <span className="meta-item">
                    <span className="meta-icon">⏱️</span>
                      {quiz.durationMinutes} mins
                  </span>
                                    <span className="meta-item">
                    {/*<span className="meta-icon">❓</span>*/}
                                        {quiz.questionCount} questions
                  </span>
                                </div>
                                <Link to={`/quiz/${quiz.id}`} className="start-quiz-btn">
                                    Start Quiz
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quizzes;
