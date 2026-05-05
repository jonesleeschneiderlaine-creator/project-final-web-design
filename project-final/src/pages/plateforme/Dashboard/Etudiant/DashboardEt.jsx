// src/pages/plateforme/Dashboard/Etudiant/DashboardEt.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import "./dashboardEt.css";

const DashboardEt = () => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  // If user is enseignant, redirect to enseignant dashboard
  if (userRole === 'enseignant') {
    return <Navigate to="/plateforme/enseignant" replace />;
  }

  return (
    <div className="dashboard-et">
      <h1>Dashboard Etudiant</h1>
    </div>
  );
};

export default DashboardEt;