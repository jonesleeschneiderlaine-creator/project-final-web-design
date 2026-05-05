// src/pages/plateforme/Auth/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import './auth.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  // Check if we have a valid reset session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/connexion');
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/connexion');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-page__container">
          <div className="auth-page__card" style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div className="signin__header">
              <div className="signin__icon">✅</div>
              <h2 className="signin__title">Mot de passe mis à jour !</h2>
              <p className="signin__subtitle">
                Votre mot de passe a été changé avec succès.
                Vous allez être redirigé vers la page de connexion.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-page__background">
        <div className="auth-page__bg-circle auth-page__bg-circle--1"></div>
        <div className="auth-page__bg-circle auth-page__bg-circle--2"></div>
        <div className="auth-page__bg-circle auth-page__bg-circle--3"></div>
      </div>

      <div className="auth-page__container">
        <div className="auth-page__card" style={{ maxWidth: '480px' }}>
          <div className="signin__header">
            <div className="signin__icon">🔐</div>
            <h2 className="signin__title">Nouveau mot de passe</h2>
            <p className="signin__subtitle">
              Créez un nouveau mot de passe pour votre compte
            </p>
          </div>

          <form className="signin__form" onSubmit={handleSubmit}>
            {error && (
              <div className="signin__error-global">{error}</div>
            )}

            <div className="signin__form-group">
              <label className="signin__label">Nouveau mot de passe</label>
              <div className="signin__password-wrapper">
                <FiLock className="signin__password-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="signin__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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
            </div>

            <div className="signin__form-group">
              <label className="signin__label">Confirmer le mot de passe</label>
              <div className="signin__password-wrapper">
                <FiLock className="signin__password-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="signin__input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="signin__submit" disabled={loading}>
              {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;