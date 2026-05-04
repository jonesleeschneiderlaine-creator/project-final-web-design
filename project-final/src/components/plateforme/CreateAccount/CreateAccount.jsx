// src/components/plateforme/CreateAccount/CreateAccount.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiUserPlus,
} from 'react-icons/fi';

import {FcGoogle} from 'react-icons/fc'

import {FaFacebook} from 'react-icons/fa';

import './createAccount.css';

const CreateAccount = ({ onSuccess, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'etudiant'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Le nom complet est requis';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Nom trop court';
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Au moins 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      await onSuccess(formData.email, formData.password, userData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account">
      <div className="create-account__header">
        <div className="create-account__icon">🎓</div>
        <h2 className="create-account__title">Créer un compte</h2>
        <p className="create-account__subtitle">Rejoignez la communauté EduHaïti</p>
      </div>

      <form className="create-account__form" onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="create-account__error-global">
            {errors.submit}
          </div>
        )}

        <div className="create-account__form-group">
          <label htmlFor="full_name" className="create-account__label">
            Nom complet *
          </label>
          <div className="create-account__input-wrapper">
            <FiUser className="create-account__input-icon" size={18} />
            <input
              type="text"
              id="full_name"
              name="full_name"
              className={`create-account__input ${errors.full_name ? 'create-account__input--error' : ''}`}
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              disabled={loading}
            />
          </div>
          {errors.full_name && (
            <span className="create-account__error">{errors.full_name}</span>
          )}
        </div>

        <div className="create-account__form-group">
          <label htmlFor="email" className="create-account__label">
            Email *
          </label>
          <div className="create-account__input-wrapper">
            <FiMail className="create-account__input-icon" size={18} />
            <input
              type="email"
              id="email"
              name="email"
              className={`create-account__input ${errors.email ? 'create-account__input--error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@eduhaïti.ht"
              disabled={loading}
            />
          </div>
          {errors.email && (
            <span className="create-account__error">{errors.email}</span>
          )}
        </div>

        <div className="create-account__form-group">
          <label htmlFor="phone" className="create-account__label">
            Téléphone (optionnel)
          </label>
          <div className="create-account__input-wrapper">
            <FiPhone className="create-account__input-icon" size={18} />
            <input
              type="tel"
              id="phone"
              name="phone"
              className="create-account__input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+509 1234 5678"
              disabled={loading}
            />
          </div>
        </div>

        <div className="create-account__form-group">
          <label htmlFor="role" className="create-account__label">
            Je suis *
          </label>
          <select
            id="role"
            name="role"
            className="create-account__select"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="etudiant">👨‍🎓 Étudiant</option>
            <option value="enseignant">👨‍🏫 Enseignant</option>
          </select>
        </div>

        <div className="create-account__form-group">
          <label htmlFor="password" className="create-account__label">
            Mot de passe *
          </label>
          <div className="create-account__password-wrapper">
            <FiLock className="create-account__password-icon" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`create-account__input ${errors.password ? 'create-account__input--error' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              className="create-account__toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="create-account__error">{errors.password}</span>
          )}
        </div>

        <div className="create-account__form-group">
          <label htmlFor="confirmPassword" className="create-account__label">
            Confirmer le mot de passe *
          </label>
          <div className="create-account__password-wrapper">
            <FiLock className="create-account__password-icon" size={18} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`create-account__input ${errors.confirmPassword ? 'create-account__input--error' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              className="create-account__toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="create-account__error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="create-account__terms">
          <label className="create-account__checkbox">
            <input type="checkbox" required /> 
            J'accepte les{' '}
            <Link to="/politique-confidentialite">conditions d'utilisation</Link> 
            {' '}et la{' '}
            <Link to="/politique-confidentialite">politique de confidentialité</Link>
          </label>
        </div>

        <button 
          type="submit" 
          className="create-account__submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="create-account__spinner"></span>
              Création en cours...
            </>
          ) : (
            <>
              <FiUserPlus size={18} />
              Créer mon compte
            </>
          )}
        </button>

        <div className="create-account__divider">
          <span>Ou</span>
        </div>

        <div className="create-account__social">
          <button type="button" className="create-account__social-btn create-account__social-btn--google">
            <FcGoogle size={18} />
            Google
          </button>
          <button type="button" className="create-account__social-btn create-account__social-btn--facebook">
            <FaFacebook size={18} />
            Facebook
          </button>
        </div>
      </form>

      <div className="create-account__footer">
        <p>
          Déjà un compte ?{' '}
          <button 
            type="button" 
            className="create-account__switch"
            onClick={onSwitchToSignIn}
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;