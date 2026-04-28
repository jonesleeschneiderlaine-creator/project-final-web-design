import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './Connexion.css';

const Connexion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Connexion avec Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      console.log('Connexion réussie:', data);

      // Récupérer le rôle de l'utilisateur depuis la table profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Erreur récupération profil:', profileError);
        // Par défaut, on redirige vers la page étudiant
        navigate('/dashboard-etudiant');
        return;
      }

      const role = profileData?.role || 'etudiant';
      console.log('Rôle utilisateur:', role);

      // Redirection selon le rôle
      switch (role) {
        case 'enseignant':
          navigate('/dashboard-enseignant');
          break;
        case 'admin':
          navigate('/dashboard-admin');
          break;
        case 'etudiant':
        default:
          navigate('/dashboard-etudiant');
          break;
      }

      alert('Connexion réussie ! Bienvenue sur EduHaïti.');
    } catch (error) {
      setError(error.message);
      alert('Erreur de connexion: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/">
            <h1>🇭🇹 EduHaïti</h1>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2>Connexion</h2>
            <span className="badge">480/450</span>
          </div>

          <div className="auth-body">
            <p className="welcome-text">Bienvenue !</p>
            <p className="sub-text">Connectez-vous à votre compte</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="exemple@eduhaiti.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>

        <div className="auth-footer">
          <p>Pas encore de compte ? <Link to="/createaccount">Créer un compte</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;