// src/components/plateforme/PlateformeLayout.jsx
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import './plateformeLayout.css';

const PlateformeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, loading, userRole } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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

  return (
    <div className="plateforme-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} userRole={userRole} />
      <TopBar onMenuClick={toggleSidebar} />
      
      <main className="plateforme-layout__main">
        <div className="plateforme-layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PlateformeLayout;