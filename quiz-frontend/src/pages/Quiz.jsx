import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getQuizById} from '../api/quizApi';
import {submitAttempt} from '../api/attemptApi';
import './Quiz.css';

const Quiz = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [startTime] = useState(Date.now());

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {
        try {
            const data = await getQuizById(id);
            setQuiz(data);
        } catch (err) {
            setError('Failed to load quiz. Please try again.');
            console.error('Error fetching quiz:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (questionId, option) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const goToQuestion = (index) => {
        setCurrentQuestion(index);
    };

    const goToPrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const goToNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = async () => {
        const unanswered = quiz.questions.filter((q) => answers[q.id] === undefined);

        if (unanswered.length > 0) {
            const confirmSubmit = window.confirm(
                `You have ${unanswered.length} unanswered question(s). Do you want to submit anyway?`
            );
            if (!confirmSubmit) return;
        }

        setSubmitting(true);
        try {
            const result = await submitAttempt(id, answers);
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);

            // Navigate to result page with state
            navigate('/result', {
                state: {
                    result,
                    quiz,
                    answers,
                    timeTaken,
                },
            });
        } catch (err) {
            setError('Failed to submit quiz. Please try again.');
            console.error('Error submitting quiz:', err);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="quiz-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => navigate('/quizzes')} className="back-btn">
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="quiz-page">
                <div className="error-container">
                    <p>Quiz not found or has no questions.</p>
                    <button onClick={() => navigate('/quizzes')} className="back-btn">
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / quiz.questions.length) * 100;

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                {/* Quiz Header */}
                <div className="quiz-header">
                    <h1>{quiz.title}</h1>
                    <div className="quiz-info">
                        <span>⏱️ {quiz.durationMinutes} mins</span>
                        <span> {quiz.questions.length} questions</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <span className="progress-text">
            {answeredCount}/{quiz.questions.length} answered
          </span>
                </div>

                {/* Question Navigator */}
                <div className="question-navigator">
                    {quiz.questions.map((q, index) => (
                        <button
                            key={q.id || `question-${index}`}
                            className={`nav-btn ${currentQuestion === index ? 'active' : ''} ${
                                answers[q.id] !== undefined ? 'answered' : ''
                            }`}
                            onClick={() => goToQuestion(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Question Card */}
                <div className="question-card">
                    <div className="question-number">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </div>
                    <h2 className="question-text">{question.question}</h2>

                    <div className="options-list">
                        {question.options.map((option, optIndex) => (
                            <label
                                key={`question-${currentQuestion}-option-${optIndex}`}
                                className={`option-item ${
                                    answers[question.id] === option ? 'selected' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => handleOptionSelect(question.id, option)}
                                />
                                <span className="option-letter">
                  {String.fromCharCode(65 + optIndex)}
                </span>
                                <span className="option-text">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="quiz-actions">
                    <button
                        className="nav-action-btn prev-btn"
                        onClick={goToPrevious}
                        disabled={currentQuestion === 0}
                    >
                        ← Previous
                    </button>

                    {currentQuestion === quiz.questions.length - 1 ? (
                        <button
                            className="nav-action-btn submit-btn"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button className="nav-action-btn next-btn" onClick={goToNext}>
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
