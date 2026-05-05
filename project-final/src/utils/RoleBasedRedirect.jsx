// src/utils/RoleBasedRedirect.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RoleBasedRedirect = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, userRole } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  // If allowedRoles is provided, check if user has permission
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to the appropriate dashboard
    if (userRole === 'enseignant') {
      return <Navigate to="/plateforme/enseignant" replace />;
    }
    return <Navigate to="/plateforme" replace />;
  }

  return children;
};

// Hook to get dashboard path based on role
export const useDashboardPath = () => {
  const { userRole, loading } = useAuth();
  
  if (loading) return '/plateforme';
  
  switch (userRole) {
    case 'enseignant':
      return '/plateforme/enseignant';
    case 'etudiant':
    default:
      return '/plateforme';
  }
};