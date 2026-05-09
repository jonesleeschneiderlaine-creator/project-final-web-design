// src/components/plateforme/CreateAccount/CreateAccount.jsx
// ─── Inscription — UI designer + logique existante ───────────────────────────

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorAlert } from '../../shared/ErrorAlert/ErrorAlert';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiCheck, FiDollarSign } from 'react-icons/fi';
import './createAccount.css';

const CreateAccount = ({ onSuccess, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ── Validation ──────────────────────────────────────────────────
  const validateForm = () => {
    const e = {};
    if (!formData.nom.trim()) e.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) e.prenom = 'Le prénom est requis';
    if (!formData.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email invalide';
    if (!formData.password) e.password = 'Mot de passe requis';
    else if (formData.password.length < 6) e.password = '6 caractères minimum';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Ne correspondent pas';
    setErrors(e);
    return Object.keys(e).length === 0;
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
      const userData = { full_name: `${formData.prenom} ${formData.nom}`, phone: '', role: 'etudiant' };
      await onSuccess(formData.email, formData.password, userData);
    } catch (error) {
      setSubmitError(error);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="create-account">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="create-account__header">
        <h2 className="create-account__title">Inscription</h2>
      </div>

      <div className="create-account__body">
        <p className="create-account__welcome">Créer un compte</p>
        <p className="create-account__sub">Rejoignez la communauté éducative haïtienne</p>

        {/* ── Erreur globale ────────────────────────────────────── */}
        <ErrorAlert
          key={submitError?.message || submitError}
          error={submitError}
          onDismiss={() => setSubmitError(null)}
        />

        <form className="create-account__form" onSubmit={handleSubmit}>
          {/* ── Nom + Prénom ────────────────────────────────────── */}
          <div className="create-account__row">
            <div className="create-account__group">
              <label htmlFor="nom">Nom</label>
              <div className="create-account__input-wrap">
                <FiUser className="create-account__input-icon" size={18} />
                <input
                  id="nom" name="nom" type="text" placeholder="Votre nom"
                  className={`create-account__input ${errors.nom ? 'create-account__input--err' : ''}`}
                  value={formData.nom} onChange={handleChange} disabled={loading}
                />
              </div>
              {errors.nom && <span className="create-account__field-err">{errors.nom}</span>}
            </div>
            <div className="create-account__group">
              <label htmlFor="prenom">Prénom</label>
              <div className="create-account__input-wrap">
                <FiUser className="create-account__input-icon" size={18} />
                <input
                  id="prenom" name="prenom" type="text" placeholder="Votre prénom"
                  className={`create-account__input ${errors.prenom ? 'create-account__input--err' : ''}`}
                  value={formData.prenom} onChange={handleChange} disabled={loading}
                />
              </div>
              {errors.prenom && <span className="create-account__field-err">{errors.prenom}</span>}
            </div>
          </div>

          {/* ── Email ───────────────────────────────────────────── */}
          <div className="create-account__group">
            <label htmlFor="email">Adresse e-mail</label>
            <div className="create-account__input-wrap">
              <FiMail className="create-account__input-icon" size={18} />
              <input
                id="email" name="email" type="email" placeholder="exemple@eduhaiti.com"
                className={`create-account__input ${errors.email ? 'create-account__input--err' : ''}`}
                value={formData.email} onChange={handleChange} disabled={loading}
              />
            </div>
            {errors.email && <span className="create-account__field-err">{errors.email}</span>}
          </div>

          {/* ── Mot de passe ────────────────────────────────────── */}
          <div className="create-account__group">
            <label htmlFor="password">Mot de passe</label>
            <div className="create-account__input-wrap">
              <FiLock className="create-account__input-icon" size={18} />
              <input
                id="password" name="password" type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`create-account__input ${errors.password ? 'create-account__input--err' : ''}`}
                value={formData.password} onChange={handleChange} disabled={loading}
              />
              <button type="button" className="create-account__toggle" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.password && <span className="create-account__field-err">{errors.password}</span>}
          </div>

          {/* ── Confirmer ───────────────────────────────────────── */}
          <div className="create-account__group">
            <label htmlFor="confirmPassword">Confirmer mot de passe</label>
            <div className="create-account__input-wrap">
              <FiLock className="create-account__input-icon" size={18} />
              <input
                id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className={`create-account__input ${errors.confirmPassword ? 'create-account__input--err' : ''}`}
                value={formData.confirmPassword} onChange={handleChange} disabled={loading}
              />
              <button type="button" className="create-account__toggle" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="create-account__field-err">{errors.confirmPassword}</span>}
          </div>

          {/* ── Submit ──────────────────────────────────────────── */}
          <button type="submit" className="create-account__submit" disabled={loading}>
            {loading ? (
              <>
                <span className="create-account__spinner" />
                Inscription en cours...
              </>
            ) : (
              <>
                <FiUserPlus size={18} />
                Créer un compte
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Carte avantages ──────────────────────────────────────── */}
      <div className="create-account__benefits">
        <h3><FiDollarSign size={20} /> Éviter les frais de base</h3>
        <ul>
          <li><FiCheck size={14} /> Éviter le téléchargement des applications et d'autres ressources</li>
          <li><FiCheck size={14} /> Éviter les charges supplémentaires pour l'utilisation des services</li>
        </ul>
        <button type="button" className="create-account__benefits-btn">
          Éviter les frais de base
        </button>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="create-account__footer">
        <p>
          Déjà un compte ?{' '}
          <button type="button" className="create-account__link" onClick={onSwitchToSignIn}>
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;