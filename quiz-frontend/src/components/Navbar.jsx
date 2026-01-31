import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const {isAuthenticated, isAdmin, email, role, logout} = useAuth();
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
                    🎯 IntelliPrep
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
                            {isAdmin && (
                                <li className="navbar-item">
                                    <Link to="/admin/create-quiz" className="navbar-link admin-link"
                                          onClick={closeMenu}>
                                        Create Quiz
                                    </Link>
                                </li>
                            )}
                            <li className="navbar-item">
                                <Link to="/history" className="navbar-link" onClick={closeMenu}>
                                    History
                                </Link>
                            </li>
                            <li className="navbar-item navbar-user">
                                <span className={`role-badge ${isAdmin ? 'admin-badge' : 'user-badge'}`}>
                                    {isAdmin ? 'Admin' : 'User'}
                                </span>
                                {email && <span className="user-email">{email}</span>}
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
