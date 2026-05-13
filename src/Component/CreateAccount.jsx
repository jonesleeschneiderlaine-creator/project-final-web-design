import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const db = getFirestore();
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
      // 🔥 1. CRÉATION DU COMPTE FIREBASE AUTH
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;
      console.log('Utilisateur créé:', user);

      // 🔥 2. MISE À JOUR DU PROFIL (displayName)
      await updateProfile(user, {
        displayName: `${formData.prenom} ${formData.nom}`
      });

      // 🔥 3. AJOUT DANS FIRESTORE (collection "users")
      const avatar = (formData.prenom.charAt(0) + formData.nom.charAt(0)).toUpperCase();
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        phone: '',
        role: 'student',
        status: 'active',
        blockUntil: null,
        avatar: avatar,
        createdAt: new Date().toISOString()
      });

      alert('✅ Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/connexion');
      
    } catch (error) {
      console.error('Erreur complète:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('❌ Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.');
          break;
        case 'auth/weak-password':
          setError('❌ Le mot de passe est trop faible. Utilisez au moins 6 caractères.');
          break;
        case 'auth/invalid-email':
          setError('❌ Email invalide. Veuillez entrer un email valide.');
          break;
        default:
          setError(`❌ Erreur: ${error.message}`);
      }
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