// src/components/plateforme/Sidebar/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  FiBarChart2, 
  FiBookOpen, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiX,
  FiGrid
} from 'react-icons/fi';
import './sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/plateforme', icon: FiBarChart2, label: 'Tableau de bord' },
    { path: '/plateforme/cours', icon: FiBookOpen, label: 'Mes cours' },
    { path: '/plateforme/enseignant', icon: FiUser, label: 'Espace enseignant' },
    { path: '/plateforme/parametres', icon: FiSettings, label: 'Paramètres' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
  };

  return (
    <>
      {isOpen && <div className="sidebar__overlay" onClick={onClose}></div>}
      
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <FiGrid className="sidebar__logo-icon" size={28} />
            <span className="sidebar__logo-text">EduHaïti</span>
          </div>
          <button className="sidebar__close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                <Icon className="sidebar__nav-icon" size={22} />
                <span className="sidebar__nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">
              {user?.user_metadata?.full_name?.charAt(0) || '👤'}
            </div>
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">
                {user?.user_metadata?.full_name || 'Utilisateur'}
              </p>
              <p className="sidebar__user-role">
                {user?.user_metadata?.role === 'enseignant' ? 'Enseignant' : 'Étudiant'}
              </p>
            </div>
          </div>
          
          <button onClick={handleLogout} className="sidebar__logout">
            <FiLogOut className="sidebar__logout-icon" size={20} />
            <span className="sidebar__logout-text">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;