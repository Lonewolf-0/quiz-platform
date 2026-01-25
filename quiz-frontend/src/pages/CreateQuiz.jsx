import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createQuiz} from '../api/quizApi';
import './CreateQuiz.css';

const emptyQuestion = () => ({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
});

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        durationMinutes: 15,
        questions: [emptyQuestion()]
    });

    const handleBasicChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'durationMinutes' ? parseInt(value) || 0 : value
        }));
    };

    const handleQuestionChange = (index, value) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            newQuestions[index] = {...newQuestions[index], question: value};
            return {...prev, questions: newQuestions};
        });
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            const newOptions = [...newQuestions[questionIndex].options];
            newOptions[optionIndex] = value;
            newQuestions[questionIndex] = {...newQuestions[questionIndex], options: newOptions};
            return {...prev, questions: newQuestions};
        });
    };

    const handleCorrectAnswerChange = (questionIndex, value) => {
        setFormData(prev => {
            const newQuestions = [...prev.questions];
            newQuestions[questionIndex] = {...newQuestions[questionIndex], correctAnswer: value};
            return {...prev, questions: newQuestions};
        });
    };

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, emptyQuestion()]
        }));
    };

    const removeQuestion = (index) => {
        if (formData.questions.length <= 1) {
            setError('Quiz must have at least one question');
            return;
        }
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Please enter a quiz title');
            return false;
        }
        if (!formData.description.trim()) {
            setError('Please enter a quiz description');
            return false;
        }
        if (formData.durationMinutes < 1) {
            setError('Duration must be at least 1 minute');
            return false;
        }

        for (let i = 0; i < formData.questions.length; i++) {
            const q = formData.questions[i];
            if (!q.question.trim()) {
                setError(`Question ${i + 1} text is required`);
                return false;
            }
            for (let j = 0; j < q.options.length; j++) {
                if (!q.options[j].trim()) {
                    setError(`Question ${i + 1}: Option ${j + 1} is required`);
                    return false;
                }
            }
            if (!q.correctAnswer) {
                setError(`Question ${i + 1}: Please select the correct answer`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await createQuiz(formData);
            setSuccess('Quiz created successfully!');
            setTimeout(() => {
                navigate('/quizzes');
            }, 1500);
        } catch (err) {
            console.error('Error creating quiz:', err);
            setError(err.response?.data?.message || 'Failed to create quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-quiz-page">
            <div className="create-quiz-container">
                <div className="create-quiz-header">
                    <h1>Create New Quiz</h1>
                    <p>Fill in the details below to create a new quiz</p>
                </div>

                <form onSubmit={handleSubmit} className="create-quiz-form">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    {/* Basic Info Section */}
                    <div className="form-section">
                        <h2>Basic Information</h2>

                        <div className="form-group">
                            <label htmlFor="title">Quiz Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleBasicChange}
                                placeholder="Enter quiz title"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleBasicChange}
                                placeholder="Enter quiz description"
                                rows="3"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="durationMinutes">Duration (minutes)</label>
                            <input
                                type="number"
                                id="durationMinutes"
                                name="durationMinutes"
                                value={formData.durationMinutes}
                                onChange={handleBasicChange}
                                min="1"
                                max="180"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <h2>Questions ({formData.questions.length})</h2>
                            <button
                                type="button"
                                className="add-question-btn"
                                onClick={addQuestion}
                                disabled={loading}
                            >
                                + Add Question
                            </button>
                        </div>

                        {formData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="question-card">
                                <div className="question-header">
                                    <h3>Question {qIndex + 1}</h3>
                                    {formData.questions.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-question-btn"
                                            onClick={() => removeQuestion(qIndex)}
                                            disabled={loading}
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Question Text</label>
                                    <input
                                        type="text"
                                        value={question.question}
                                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                        placeholder="Enter the question"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="options-section">
                                    <label>Options (Select the correct answer)</label>
                                    {question.options.map((option, oIndex) => (
                                        <div key={oIndex} className="option-row">
                                            <input
                                                type="radio"
                                                name={`correct-${qIndex}`}
                                                checked={question.correctAnswer === option && option !== ''}
                                                onChange={() => handleCorrectAnswerChange(qIndex, option)}
                                                disabled={loading || !option.trim()}
                                            />
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                placeholder={`Option ${oIndex + 1}`}
                                                className="option-input"
                                                disabled={loading}
                                            />
                                            {question.correctAnswer === option && option !== '' && (
                                                <span className="correct-badge">✓ Correct</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Section */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/quizzes')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Quiz'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
