import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useRefreshToken from '../hooks/useRefreshToken';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error('Token verification failed:', error);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [refresh]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
