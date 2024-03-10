import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Create AuthContext
const AuthContext = createContext();

// Create useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export function AuthProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = (username, token) => {
        if (token) {
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            setUsername(username);
            localStorage.setItem('username', username);
        } else {
            console.error('Token is undefined');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
    };

    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.split('.').length === 3) {
            try {
                const decoded = jwt_decode(token);
                setIsLoggedIn(true);
                setDecodedToken(decoded); // Store the decoded token in state
                setUsername(decoded.username); // Set username from decoded token
            } catch (error) {
                console.error("Invalid token", error);
                console.log("Catch block executed");
            }
        } else {
            setIsLoggedIn(false);
            setUsername('');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}