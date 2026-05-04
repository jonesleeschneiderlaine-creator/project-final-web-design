// src/utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading spinner while checking auth
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to auth page if not logged in
    return <Navigate to="/connexion" replace />;
  }

  return children;
};