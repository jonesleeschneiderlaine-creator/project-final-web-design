// src/pages/plateforme/Auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import './auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-page__container">
          <div className="auth-page__card" style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div className="signin__header">
              <div className="signin__icon">📧</div>
              <h2 className="signin__title">Vérifiez vos emails</h2>
              <p className="signin__subtitle">
                Nous avons envoyé un lien de réinitialisation à {email}
              </p>
            </div>
            <Link to="/connexion" className="signin__submit" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Retour à la connexion
            </Link>
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
            <h2 className="signin__title">Mot de passe oublié ?</h2>
            <p className="signin__subtitle">
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe
            </p>
          </div>

          <form className="signin__form" onSubmit={handleSubmit}>
            {error && (
              <div className="signin__error-global">{error}</div>
            )}

            <div className="signin__form-group">
              <label className="signin__label">Email</label>
              <div className="signin__input-wrapper">
                <FiMail className="signin__input-icon" size={18} />
                <input
                  type="email"
                  className="signin__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@eduhaïti.ht"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="signin__submit" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
            </button>

            <div className="signin__footer" style={{ borderTop: 'none', marginTop: '16px' }}>
              <Link to="/connexion" className="signin__switch">
                <FiArrowLeft size={16} style={{ marginRight: '8px' }} />
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;