import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTokenFromCookies, clearAuthCookies } from '../utils/cookieHelper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const cookieToken = getTokenFromCookies();
    const storedUser = localStorage.getItem('user');
    
    if (cookieToken && storedUser) {
      setToken(cookieToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (cookieToken && !storedUser) {
      clearAuthCookies();
    } else if (!cookieToken && storedUser) {
      localStorage.removeItem('user');
    }
    
    setIsLoading(false);
  };

  const login = (userData) => {
    const cookieToken = getTokenFromCookies();
    
    setUser(userData);
    setToken(cookieToken);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
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