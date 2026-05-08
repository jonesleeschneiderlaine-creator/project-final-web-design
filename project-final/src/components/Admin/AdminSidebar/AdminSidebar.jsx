// src/components/Admin/AdminSidebar/AdminSidebar.jsx
// ─── Sidebar admin ────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom';
import { FiBarChart2, FiUsers, FiUserCheck, FiUserPlus, FiFlag, FiFileText, FiLogOut } from 'react-icons/fi';
import './adminSidebar.css';

const NAV = [
  { id: 'dashboard',     icon: FiBarChart2, label: 'Tableau de bord' },
  { id: 'users',         icon: FiUsers,     label: 'Utilisateurs' },
  { id: 'teachers',      icon: FiUserCheck, label: 'Enseignants & Vidéos' },
  { id: 'createTeacher', icon: FiUserPlus,  label: 'Créer enseignant' },
  { id: 'reports',       icon: FiFlag,      label: 'Signalements' },
  { id: 'logs',          icon: FiFileText,  label: 'Journaux' },
];

const AdminSidebar = ({ activeTab, onTabChange }) => (
  <aside className="admin-sidebar">
    <div className="admin-sidebar__brand">
      <h2>🇭🇹 EduHaïti</h2>
      <span className="admin-sidebar__role">Administrateur</span>
    </div>

    <nav className="admin-sidebar__nav">
      {NAV.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`admin-sidebar__item${activeTab === id ? ' admin-sidebar__item--active' : ''}`}
          onClick={() => onTabChange(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>

    <div className="admin-sidebar__footer">
      <Link to="/connexion" className="admin-sidebar__logout">
        <FiLogOut size={18} />
        <span>Déconnexion</span>
      </Link>
    </div>
  </aside>
);

export default AdminSidebar;