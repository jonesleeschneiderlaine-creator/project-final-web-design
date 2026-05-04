// src/hooks/useAuth.js
import { useUser } from '../contexts/UserContext';

export const useAuth = () => {
  const { user, loading, error, login, signup, logout, isAuthenticated } = useUser();
  
  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated
  };
};