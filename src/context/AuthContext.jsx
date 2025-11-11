import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTokenFromCookies, clearAuthCookies } from '../utils/cookieHelper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in cookies
    const cookieToken = getTokenFromCookies();
    
    // User data localStorage se (ya backend se fetch kar sakte ho)
    const storedUser = localStorage.getItem('user');

    if (cookieToken && storedUser) {
      setToken(cookieToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (cookieToken && !storedUser) {
      // Agar cookie hai but user data nahi, to logout kar do
      clearAuthCookies();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    // Token already cookie mein hai backend se
    const cookieToken = getTokenFromCookies();
    
    setUser(userData);
    setToken(cookieToken);
    setIsAuthenticated(true);
    
    // Only user data localStorage mein save karo (token cookies mein hai)
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Clear cookies aur localStorage
    clearAuthCookies();
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};