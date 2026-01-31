import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const {isAuthenticated} = useAuth();

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Test Your Knowledge with
                        <span className="highlight"> IntelliPrep</span>
                    </h1>
                    <p className="hero-subtitle">
                        Challenge yourself with our interactive quizzes. Track your progress,
                        compete with others, and learn something new every day!
                    </p>
                    <div className="hero-buttons">
                        {isAuthenticated ? (
                            <Link to="/quizzes" className="btn btn-primary">
                                Browse Quizzes
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primary">
                                    Get Started
                                </Link>
                                <Link to="/login" className="btn btn-secondary">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-graphic">
                        <span className="emoji">📚</span>
                        <span className="emoji">🎯</span>
                        <span className="emoji">🏆</span>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Diverse Quizzes</h3>
                        <p>Explore quizzes on various topics including Java, Python, and more.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⏱️</div>
                        <h3>Timed Challenges</h3>
                        <p>Test your speed with timed quizzes and improve your skills.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Track Progress</h3>
                        <p>View your attempt history and monitor your improvement over time.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Platform</h3>
                        <p>Your data is protected with industry-standard security measures.</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Start Learning?</h2>
                <p>Join thousands of learners who are improving their skills every day.</p>
                {!isAuthenticated && (
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Create Free Account
                    </Link>
                )}
            </section>
        </div>
    );
};

export default Home;
