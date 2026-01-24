import {createContext, useContext, useEffect, useState} from 'react';
import {getMe, login as loginApi, register as registerApi} from '../api/authApi';

const AuthContext = createContext(null);

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

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
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
        setToken(newToken);

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
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
