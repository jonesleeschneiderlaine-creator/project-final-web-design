// src/components/Admin/TeacherForm/TeacherForm.jsx
// ─── Formulaire création enseignant ──────────────────────────────────────────

import { useState } from 'react';
import { FiUserPlus, FiX } from 'react-icons/fi';
import './teacherForm.css';

const INITIAL = {
  nom: '', prenom: '', email: '', phone: '',
  password: '', confirmPassword: '', specialite: '', bio: '', avatar: '',
};

const SPECIALITES = [
  'Mathématiques', 'Sciences', 'Français', 'Histoire',
  'Anglais', 'Informatique', 'Arts', 'Philosophie',
];

const TeacherForm = ({ onSubmit }) => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Mots de passe différents'); return; }
    if (form.password.length < 6)            { setError('6 caractères minimum'); return; }
    if (!form.email.includes('@'))            { setError('Email invalide'); return; }

    setLoading(true);
    try {
      await onSubmit(form);
      setForm(INITIAL);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Erreur création');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setForm(INITIAL); setError(''); };

  return (
    <div className="teacher-form-wrap">
      <div className="teacher-form__header">
        <h2>Créer un compte enseignant</h2>
        <p>Remplissez le formulaire pour ajouter un enseignant</p>
      </div>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <div className="teacher-form__row">
          <label>
            Nom <span>*</span>
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required />
          </label>
          <label>
            Prénom <span>*</span>
            <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" required />
          </label>
        </div>

        <div className="teacher-form__row">
          <label>
            Email <span>*</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="enseignant@eduhaiti.com" required />
          </label>
          <label>
            Téléphone <span>*</span>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+509 XX XX XXXX" required />
          </label>
        </div>

        <div className="teacher-form__row">
          <label>
            Mot de passe <span>*</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
          </label>
          <label>
            Confirmer <span>*</span>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
          </label>
        </div>

        <div className="teacher-form__row">
          <label>
            Spécialité <span>*</span>
            <select name="specialite" value={form.specialite} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              {SPECIALITES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>
            Avatar (initiales)
            <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="MP" />
          </label>
        </div>

        <label>
          Bio
          <textarea name="bio" rows={4} value={form.bio} onChange={handleChange} placeholder="Parcours, qualifications..." />
        </label>

        {error   && <div className="teacher-form__msg teacher-form__msg--error">{error}</div>}
        {success && <div className="teacher-form__msg teacher-form__msg--ok">Enseignant créé !</div>}

        <div className="teacher-form__btns">
          <button type="button" className="teacher-form__cancel" onClick={reset}>
            <FiX size={16} /> Annuler
          </button>
          <button type="submit" className="teacher-form__submit" disabled={loading}>
            <FiUserPlus size={16} />
            {loading ? 'Création...' : "Créer l'enseignant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;