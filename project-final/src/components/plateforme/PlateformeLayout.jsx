// src/components/plateforme/PlateformeLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import './plateformeLayout.css';

const PlateformeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="plateforme-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
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