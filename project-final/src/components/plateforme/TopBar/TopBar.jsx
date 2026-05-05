// src/components/plateforme/TopBar/TopBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import UserMenu from '../UserMenu/UserMenu';
import { FiMenu, FiBell, FiChevronDown, FiPlus } from 'react-icons/fi';
import './topBar.css';

const TopBar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const prenom = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Utilisateur';
  
  const initiales = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const handleNouveauCours = () => {
    navigate('/plateforme/cours/nouveau');
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar__left">
          <button className="topbar__menu-btn" onClick={onMenuClick}>
            <FiMenu size={24} />
          </button>
          <div className="topbar__breadcrumb">
            <h1 className="topbar__salutation">
              Bonjour, {prenom}! 👩‍🏫
            </h1>
          </div>
        </div>

        <div className="topbar__right">
          {/* Only show Nouveau cours button on enseignant dashboard */}
          {window.location.pathname.includes('/plateforme/enseignant') && (
            <button
              className="topbar__btn-nouveau"
              onClick={handleNouveauCours}
            >
              <FiPlus size={18} />
              <span>Nouveau cours</span>
            </button>
          )}

          <button className="topbar__notifications">
            <FiBell className="topbar__notifications-icon" size={22} />
            <span className="topbar__notifications-badge">3</span>
          </button>

          <div className="topbar__user" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <div className="topbar__user-avatar">
              {initiales}
            </div>
            <div className="topbar__user-info">
              <p className="topbar__user-name">
                {prenom}
              </p>
              <p className="topbar__user-role">
                {user?.user_metadata?.role === 'enseignant' ? 'Enseignant' : 'Étudiant'}
              </p>
            </div>
            <FiChevronDown className="topbar__user-arrow" size={16} />
          </div>
        </div>
      </header>

      <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
    </>
  );
};

export default TopBar;