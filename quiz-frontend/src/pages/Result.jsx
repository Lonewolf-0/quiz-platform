import {Link, useLocation, useNavigate} from 'react-router-dom';
import './Result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {result, quiz, answers, timeTaken} = location.state || {};

    // If no result data, redirect to quizzes
    if (!result || !quiz) {
        return (
            <div className="result-page">
                <div className="no-result">
                    <h2>No Result Found</h2>
                    <p>Please take a quiz first to see results.</p>
                    <Link to="/quizzes" className="btn-primary">
                        Browse Quizzes
                    </Link>
                </div>
            </div>
        );
    }

    const {score, totalQuestions} = result;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 50;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const getScoreColor = () => {
        if (percentage >= 80) return '#10b981';
        if (percentage >= 50) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="result-page">
            <div className="result-container">
                {/* Result Header */}
                <div className={`result-header ${isPassed ? 'passed' : 'failed'}`}>
                    <div className="result-icon">{isPassed ? '🎉' : '😔'}</div>
                    <h1>{isPassed ? 'Congratulations!' : 'Better Luck Next Time'}</h1>
                    <p>{isPassed ? 'You passed the quiz!' : "Don't give up, keep practicing!"}</p>
                </div>

                {/* Score Card */}
                <div className="score-card">
                    <div className="score-circle" style={{borderColor: getScoreColor()}}>
            <span className="score-percentage" style={{color: getScoreColor()}}>
              {percentage}%
            </span>
                        <span className="score-label">Score</span>
                    </div>

                    <div className="score-details">
                        <div className="detail-item">
                            <span className="detail-label">Quiz</span>
                            <span className="detail-value">{quiz.title}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Correct Answers</span>
                            <span className="detail-value correct">{score}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Wrong Answers</span>
                            <span className="detail-value wrong">{totalQuestions - score}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Questions</span>
                            <span className="detail-value">{totalQuestions}</span>
                        </div>
                        {timeTaken && (
                            <div className="detail-item">
                                <span className="detail-label">Time Taken</span>
                                <span className="detail-value">{formatTime(timeTaken)}</span>
                            </div>
                        )}
                        <div className="detail-item">
                            <span className="detail-label">Status</span>
                            <span className={`detail-value status ${isPassed ? 'pass' : 'fail'}`}>
                {isPassed ? 'PASSED' : 'FAILED'}
              </span>
                        </div>
                    </div>
                </div>

                {/* Question Review */}
                {quiz.questions && quiz.questions.length > 0 && (
                    <div className="review-section">
                        <h2>Review Your Answers</h2>
                        <div className="review-list">
                            {quiz.questions.map((question, index) => {
                                const userAnswer = answers[question.id];
                                const correctAnswer = result.correctAnswers?.[question.id];
                                const isCorrect = userAnswer && correctAnswer &&
                                    userAnswer.toLowerCase() === correctAnswer.toLowerCase();

                                return (
                                    <div key={question.id || index} className="review-item">
                                        <div className="review-header">
                                            <span className="review-number">Q{index + 1}</span>
                                            <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                                        </div>
                                        <p className="review-question">{question.question}</p>
                                        <div className="review-answers">
                                            <div className="answer-row">
                                                <span className="answer-label">Your Answer:</span>
                                                <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                          {userAnswer || 'Not answered'}
                        </span>
                                            </div>
                                            {!isCorrect && correctAnswer && (
                                                <div className="answer-row">
                                                    <span className="answer-label">Correct Answer:</span>
                                                    <span className="answer-value correct">{correctAnswer}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="result-actions">
                    <Link to="/quizzes" className="action-btn secondary">
                        Browse More Quizzes
                    </Link>
                    <Link to="/history" className="action-btn primary">
                        View History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Result;
