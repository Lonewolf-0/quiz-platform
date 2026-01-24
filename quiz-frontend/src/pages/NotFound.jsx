import {Link} from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <div className="notfound-icon">🔍</div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="home-btn">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
