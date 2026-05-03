import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas !');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères !');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Inscription avec Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nom: formData.nom,
            prenom: formData.prenom,
          }
        }
      });

      if (error) throw error;

      console.log('Inscription réussie:', data);
      alert('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.');
      navigate('/connexion');
    } catch (error) {
      setError(error.message);
      alert('Erreur d\'inscription: ' + error.message);
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
            <h2>Inscription</h2>
            <span className="badge">480/450</span>
          </div>

          <div className="auth-body">
            <p className="welcome-text">Créer un compte</p>
            <p className="sub-text">Rejoignez la communauté éducative haïtienne</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group half">
                  <label>Nom</label>
                  <input 
                    type="text" 
                    name="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group half">
                  <label>Prénom</label>
                  <input 
                    type="text" 
                    name="prenom"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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

              <div className="form-group">
                <label>Confirmer mot de passe</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Inscription en cours...' : 'Créer un compte'}
              </button>
            </form>
          </div>
        </div>

        <div className="benefits-card">
          <h3>💰 Éviter les frais de base</h3>
          <ul>
            <li>✓ Éviter le téléchargement des applications et d'autres ressources</li>
            <li>✓ Éviter les charges supplémentaires pour l'utilisation des services</li>
          </ul>
          <button className="btn-benefits">Éviter les frais de base</button>
        </div>

        <div className="auth-footer">
          <p>Déjà un compte ? <Link to="/connexion">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;