// src/pages/plateforme/Dashboard/Etudiant/DashboardEt.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import "./dashboardEt.css";

const DashboardEt = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (role === 'enseignant') {
    return <Navigate to="/plateforme/enseignant" replace />;
  }

  return (
    <div className="dashboard-et">
      <h1>Dashboard Etudiant</h1>
    </div>
  );
};

export default DashboardEt;