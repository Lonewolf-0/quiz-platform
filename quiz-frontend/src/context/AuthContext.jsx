import {createContext, useContext, useEffect, useState} from 'react';
import {getMe, login as loginApi, register as registerApi} from '../api/authApi';

const AuthContext = createContext(null);

// Helper function to parse JWT token
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('userEmail'));

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedEmail = localStorage.getItem('userEmail');
            if (storedToken) {
                try {
                    // Parse JWT to get role
                    const payload = parseJwt(storedToken);
                    if (payload?.role) {
                        setRole(payload.role);
                    }

                    if (storedEmail) {
                        setEmail(storedEmail);
                    }

                    const userData = await getMe();
                    setUser(userData);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userEmail');
                    setToken(null);
                    setUser(null);
                    setRole(null);
                    setEmail(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const response = await loginApi(email, password);
        const {token: newToken} = response;
        localStorage.setItem('token', newToken);
        localStorage.setItem('userEmail', email);
        setToken(newToken);
        setEmail(email);

        // Parse JWT to get role
        const payload = parseJwt(newToken);
        if (payload?.role) {
            setRole(payload.role);
        }

        // Fetch user info after login
        try {
            const userData = await getMe();
            setUser(userData);
        } catch (error) {
            setUser({email});
        }

        return response;
    };

    const register = async (email, password) => {
        const response = await registerApi(email, password);
        return response;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setToken(null);
        setUser(null);
        setRole(null);
        setEmail(null);
    };

    const isAuthenticated = !!token;
    const isAdmin = role === 'ADMIN';

    const value = {
        user,
        email,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        role,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
