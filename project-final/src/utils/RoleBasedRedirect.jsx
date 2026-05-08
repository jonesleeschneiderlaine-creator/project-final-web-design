// src/utils/RoleBasedRedirect.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RoleBasedRedirect = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, role } = useAuth();

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

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Rediriger selon le rôle
    if (role === 'enseignant') return <Navigate to="/plateforme/enseignant" replace />;
    if (role === 'etudiant')  return <Navigate to="/plateforme" replace />;
    if (role === 'admin')     return <Navigate to="/admin" replace />;
    return <Navigate to="/connexion" replace />;
  }

  return children;
};

export const useDashboardPath = () => {
  const { role, loading } = useAuth();
  
  if (loading) return '/plateforme';
  
  switch (role) {
    case 'enseignant':
      return '/plateforme/enseignant';
    case 'etudiant':
    default:
      return '/plateforme';
  }
};