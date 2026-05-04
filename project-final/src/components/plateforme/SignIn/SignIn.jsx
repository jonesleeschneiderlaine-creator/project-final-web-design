// src/components/plateforme/SignIn/SignIn.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiLogIn
} from 'react-icons/fi';

import {FaFacebook} from 'react-icons/fa';

import {FcGoogle} from 'react-icons/fc';

import './signIn.css';

const SignIn = ({ onSuccess, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Mot de passe trop court';
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
      await onSuccess(formData.email, formData.password);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="signin__header">
        <div className="signin__icon">🔐</div>
        <h2 className="signin__title">Connexion</h2>
        <p className="signin__subtitle">Accédez à votre compte EduHaïti</p>
      </div>

      <form className="signin__form" onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="signin__error-global">
            {errors.submit}
          </div>
        )}

        <div className="signin__form-group">
          <label htmlFor="email" className="signin__label">
            Email
          </label>
          <div className="signin__input-wrapper">
            <FiMail className="signin__input-icon" size={18} />
            <input
              type="email"
              id="email"
              name="email"
              className={`signin__input ${errors.email ? 'signin__input--error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@eduhaïti.ht"
              disabled={loading}
            />
          </div>
          {errors.email && (
            <span className="signin__error">{errors.email}</span>
          )}
        </div>

        <div className="signin__form-group">
          <label htmlFor="password" className="signin__label">
            Mot de passe
          </label>
          <div className="signin__password-wrapper">
            <FiLock className="signin__password-icon" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`signin__input ${errors.password ? 'signin__input--error' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              className="signin__toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="signin__error">{errors.password}</span>
          )}
        </div>

        <div className="signin__options">
          <label className="signin__checkbox">
            <input type="checkbox" /> Se souvenir de moi
          </label>
          <Link to="/mot-de-passe-oublie" className="signin__forgot">Mot de passe oublié ?</Link>
        </div>

        <button 
          type="submit" 
          className="signin__submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="signin__spinner"></span>
              Connexion en cours...
            </>
          ) : (
            <>
              <FiLogIn size={18} />
              Se connecter
            </>
          )}
        </button>

        <div className="signin__divider">
          <span>Ou continuer avec</span>
        </div>

        <div className="signin__social">
          <button type="button" className="signin__social-btn signin__social-btn--google">
            <FcGoogle size={18} />
            Google
          </button>
          <button type="button" className="signin__social-btn signin__social-btn--facebook">
            <FaFacebook size={18} />
            Facebook
          </button>
        </div>
      </form>

      <div className="signin__footer">
        <p>
          Pas encore de compte ?{' '}
          <button 
            type="button" 
            className="signin__switch"
            onClick={onSwitchToSignUp}
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;