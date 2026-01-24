import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import AttemptHistory from './pages/AttemptHistory';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar/>
                    <main className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home/>}/>

                            {/* Auth Routes (redirect if already logged in) */}
                            <Route
                                path="/login"
                                element={
                                    <PublicRoute>
                                        <Login/>
                                    </PublicRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <PublicRoute>
                                        <Register/>
                                    </PublicRoute>
                                }
                            />

                            {/* Protected Routes (require authentication) */}
                            <Route
                                path="/quizzes"
                                element={
                                    <ProtectedRoute>
                                        <Quizzes/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/quiz/:id"
                                element={
                                    <ProtectedRoute>
                                        <Quiz/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/result"
                                element={
                                    <ProtectedRoute>
                                        <Result/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/history"
                                element={
                                    <ProtectedRoute>
                                        <AttemptHistory/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 Not Found */}
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
