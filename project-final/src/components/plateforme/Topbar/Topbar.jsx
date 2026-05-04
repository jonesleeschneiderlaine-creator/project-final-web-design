// src/components/plateforme/TopBar/TopBar.jsx
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import UserMenu from '../UserMenu/UserMenu';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import './topBar.css';

const TopBar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="topbar__left">
          <button className="topbar__menu-btn" onClick={onMenuClick}>
            <FiMenu size={24} />
          </button>
          <div className="topbar__breadcrumb">
            <span className="topbar__breadcrumb-text">Plateforme</span>
          </div>
        </div>

        <div className="topbar__right">
          <button className="topbar__notifications">
            <FiBell className="topbar__notifications-icon" size={22} />
            <span className="topbar__notifications-badge">3</span>
          </button>

          <div className="topbar__user" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <div className="topbar__user-avatar">
              {user?.user_metadata?.full_name?.charAt(0) || '👤'}
            </div>
            <div className="topbar__user-info">
              <p className="topbar__user-name">
                {user?.user_metadata?.full_name?.split(' ')[0] || 'Utilisateur'}
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