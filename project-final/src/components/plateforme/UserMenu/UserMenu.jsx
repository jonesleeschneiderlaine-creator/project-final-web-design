// src/components/plateforme/UserMenu/UserMenu.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  FiSettings, 
  FiBookOpen, 
  FiHome, 
  FiLogOut,
  FiUser,
  FiMail
} from 'react-icons/fi';
import './userMenu.css';

const UserMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="user-menu__overlay" onClick={onClose}></div>
      <div className="user-menu">
        <div className="user-menu__header">
          <div className="user-menu__avatar">
            {user?.user_metadata?.full_name?.charAt(0) || <FiUser size={24} />}
          </div>
          <div className="user-menu__info">
            <p className="user-menu__name">
              {user?.user_metadata?.full_name || 'Utilisateur'}
            </p>
            <p className="user-menu__email">
              <FiMail size={12} style={{ display: 'inline', marginRight: '4px' }} />
              {user?.email}
            </p>
          </div>
        </div>

        <div className="user-menu__divider"></div>

        <div className="user-menu__items">
          <Link to="/plateforme/parametres" className="user-menu__item" onClick={onClose}>
            <FiSettings className="user-menu__item-icon" size={18} />
            <span>Paramètres</span>
          </Link>
          <Link to="/plateforme/cours" className="user-menu__item" onClick={onClose}>
            <FiBookOpen className="user-menu__item-icon" size={18} />
            <span>Mes cours</span>
          </Link>
          <Link to="/" className="user-menu__item" onClick={onClose}>
            <FiHome className="user-menu__item-icon" size={18} />
            <span>Accueil</span>
          </Link>
        </div>

        <div className="user-menu__divider"></div>

        <button onClick={handleLogout} className="user-menu__logout">
          <FiLogOut className="user-menu__logout-icon" size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </>
  );
};

export default UserMenu;