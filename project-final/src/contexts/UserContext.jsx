// src/contexts/UserContext.jsx
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const auth = useAuth();
  
  // Map AuthContext to your existing UserContext interface
  const value = {
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    login: auth.signIn,
    signup: auth.signUp,
    logout: auth.signOut,
    resetPassword: auth.resetPassword,
    isAuthenticated: auth.isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};