// src/components/plateforme/Sidebar/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FiX } from 'react-icons/fi';
import './sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, signOut, role } = useAuth();
  const navigate = useNavigate();

  // ── Menu selon rôle ─────────────────────────────────────────────
  const getMenuItems = () => {
    if (role === 'enseignant') {
      return [
        { path: '/plateforme',                          emoji: '🏠',  label: 'Tableau de bord' },
        { path: '/plateforme/cours',                    emoji: '📋',  label: 'Mes cours' },
        { path: '/plateforme/cours/nouveau',            emoji: '+',   label: 'Créer un cours', type: 'creer' },
        { path: '/plateforme/enseignant/etudiants',     emoji: '👥',  label: 'Mes étudiants' },
        { path: '/plateforme/enseignant/statistiques',  emoji: '📊',  label: 'Statistiques' },
        { path: '/plateforme/parametres',               emoji: '⚙️', label: 'Paramètres' },
      ];
    }

    return [
      { path: '/plateforme',                        emoji: '🏠',  label: 'Tableau de bord' },
      { path: '/plateforme/cours',                  emoji: '📋',  label: 'Mes cours' },
      { path: '/plateforme/etudiant/certificats',   emoji: '🏆',  label: 'Certificats' },
      { path: '/plateforme/etudiant/progression',   emoji: '📊',  label: 'Ma progression' },
      { path: '/plateforme/parametres',             emoji: '⚙️', label: 'Paramètres' },
    ];
  };

  const menuItems = getMenuItems();

  const handleLogout = async () => {
    await signOut();
    navigate('/connexion');
  };

  // ── Initiales avatar ────────────────────────────────────────────
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  // ── Nom affiché ─────────────────────────────────────────────────
  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur';
  };

  const roleLabel = role === 'enseignant' ? 'Enseignant' : 'Étudiant';

  return (
    <>
      {isOpen && <div className="sidebar__overlay" onClick={onClose} />}

      <aside className={`sidebar sidebar--${role === 'enseignant' ? 'enseignant' : 'etudiant'} ${isOpen ? 'sidebar--open' : ''}`}>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <span className="sidebar__logo-emoji">📚</span>
            <span className="sidebar__logo-text">EduHaïti</span>
          </div>
          <button className="sidebar__close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* ── Badge rôle ───────────────────────────────────────── */}
        {role === 'enseignant' && (
          <div className="sidebar__role-label">ENSEIGNANT</div>
        )}

        {/* ── Nav ──────────────────────────────────────────────── */}
        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__nav-item${item.type === 'creer' ? ' sidebar__nav-item--creer' : ''}${isActive ? ' sidebar__nav-item--active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar__nav-emoji">{item.emoji}</span>
              <span className="sidebar__nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className={`sidebar__user-avatar sidebar__user-avatar--${role === 'enseignant' ? 'enseignant' : 'etudiant'}`}>
              {getUserInitials()}
            </div>
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">{getUserName()}</p>
              <p className="sidebar__user-role">{roleLabel}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="sidebar__logout">
            <span className="sidebar__logout-text">Déconnexion</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;