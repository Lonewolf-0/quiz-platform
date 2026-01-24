import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getAllAttempts} from '../api/attemptApi';
import './AttemptHistory.css';

const AttemptHistory = () => {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAttempts();
    }, []);

    const fetchAttempts = async () => {
        try {
            const data = await getAllAttempts();
            setAttempts(data);
        } catch (err) {
            setError('Failed to load attempt history. Please try again.');
            console.error('Error fetching attempts:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPercentage = (score, total) => {
        return Math.round((score / total) * 100);
    };

    const getStatus = (score, total) => {
        const percentage = getPercentage(score, total);
        return percentage >= 50 ? 'Passed' : 'Failed';
    };

    if (loading) {
        return (
            <div className="history-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="history-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={fetchAttempts} className="retry-btn">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <h1>Attempt History</h1>
                    <p>View all your past quiz attempts</p>
                </div>

                {attempts.length === 0 ? (
                    <div className="no-attempts">
                        <div className="no-attempts-icon">📋</div>
                        <h2>No Attempts Yet</h2>
                        <p>You haven't taken any quizzes yet. Start learning now!</p>
                        <Link to="/quizzes" className="start-btn">
                            Browse Quizzes
                        </Link>
                    </div>
                ) : (
                    <div className="history-table-container">
                        <table className="history-table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Quiz ID</th>
                                <th>Score</th>
                                <th>Percentage</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attempts.map((attempt, index) => {
                                const percentage = getPercentage(attempt.score, attempt.totalQuestions);
                                const status = getStatus(attempt.score, attempt.totalQuestions);

                                return (
                                    <tr key={attempt.attemptId}>
                                        <td>{index + 1}</td>
                                        <td className="quiz-id">{attempt.quizId}</td>
                                        <td>
                        <span className="score">
                          {attempt.score}/{attempt.totalQuestions}
                        </span>
                                        </td>
                                        <td>
                        <span
                            className="percentage"
                            style={{
                                color:
                                    percentage >= 80
                                        ? '#10b981'
                                        : percentage >= 50
                                            ? '#f59e0b'
                                            : '#ef4444',
                            }}
                        >
                          {percentage}%
                        </span>
                                        </td>
                                        <td>
                        <span className={`status ${status.toLowerCase()}`}>
                          {status}
                        </span>
                                        </td>
                                        <td className="date">{formatDate(attempt.submittedAt)}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Summary Stats */}
                {attempts.length > 0 && (
                    <div className="stats-section">
                        <h2>Summary</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{attempts.length}</span>
                                <span className="stat-label">Total Attempts</span>
                            </div>
                            <div className="stat-card">
                <span className="stat-value">
                  {attempts.filter((a) => getPercentage(a.score, a.totalQuestions) >= 50).length}
                </span>
                                <span className="stat-label">Passed</span>
                            </div>
                            <div className="stat-card">
                <span className="stat-value">
                  {attempts.filter((a) => getPercentage(a.score, a.totalQuestions) < 50).length}
                </span>
                                <span className="stat-label">Failed</span>
                            </div>
                            <div className="stat-card">
                <span className="stat-value">
                  {Math.round(
                      attempts.reduce(
                          (acc, a) => acc + getPercentage(a.score, a.totalQuestions),
                          0
                      ) / attempts.length
                  )}
                    %
                </span>
                                <span className="stat-label">Average Score</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttemptHistory;
