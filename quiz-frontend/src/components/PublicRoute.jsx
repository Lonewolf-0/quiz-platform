import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const PublicRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/quizzes" replace/>;
    }

    return children;
};

export default PublicRoute;
