import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const {isAuthenticated, user, logout} = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    🎯 Quiz Platform
                </Link>

                <button className="navbar-toggle" onClick={toggleMenu}>
                    <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/quizzes" className="navbar-link" onClick={closeMenu}>
                                    Quizzes
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/history" className="navbar-link" onClick={closeMenu}>
                                    History
                                </Link>
                            </li>
                            <li className="navbar-item navbar-user">
                                <span className="user-email">{user?.email || 'User'}</span>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-btn logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                                    Login
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-btn register-btn" onClick={closeMenu}>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
