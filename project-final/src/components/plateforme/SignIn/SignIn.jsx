// src/components/plateforme/SignIn/SignIn.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorAlert } from '../../shared/ErrorAlert/ErrorAlert';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import './signIn.css';

const SignIn = ({ onSuccess, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ── Validation ──────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    else if (formData.password.length < 3) newErrors.password = 'Mot de passe trop court';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await onSuccess(formData.email, formData.password);
    } catch (error) {
      setSubmitError(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="signin">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="signin__header">
        <h2 className="signin__title">Connexion</h2>
      </div>

      <div className="signin__body">
        <p className="signin__welcome">Bienvenue !</p>
        <p className="signin__sub">Connectez-vous à votre compte</p>

        {/* ── Erreur globale ────────────────────────────────────── */}
        <ErrorAlert
          key={submitError?.message || submitError}
          error={submitError}
          onDismiss={() => setSubmitError(null)}
        />

        <form className="signin__form" onSubmit={handleSubmit}>
          {/* ── Email ───────────────────────────────────────────── */}
          <div className="signin__group">
            <label htmlFor="email">Email ou identifiant</label>
            <div className="signin__input-wrap">
              <FiMail className="signin__input-icon" size={18} />
              <input
                id="email"
                name="email"
                type="text"
                placeholder="exemple@eduhaiti.com ou admin"
                className={`signin__input ${errors.email ? 'signin__input--err' : ''}`}
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {errors.email && <span className="signin__field-err">{errors.email}</span>}
          </div>

          {/* ── Mot de passe ────────────────────────────────────── */}
          <div className="signin__group">
            <label htmlFor="password">Mot de passe</label>
            <div className="signin__input-wrap">
              <FiLock className="signin__input-icon" size={18} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`signin__input ${errors.password ? 'signin__input--err' : ''}`}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="signin__toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.password && <span className="signin__field-err">{errors.password}</span>}
          </div>

          {/* ── Submit ──────────────────────────────────────────── */}
          <button type="submit" className="signin__submit" disabled={loading}>
            {loading ? (
              <>
                <span className="signin__spinner" />
                Connexion en cours...
              </>
            ) : (
              <>
                <FiLogIn size={18} />
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="signin__footer">
        <p>
          Pas encore de compte ?{' '}
          <button type="button" className="signin__link" onClick={onSwitchToSignUp}>
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;