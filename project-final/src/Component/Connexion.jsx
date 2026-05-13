import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
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
      // 🔥 VÉRIFICATION SPÉCIALE POUR ADMIN (admin@gmail.com / admin-123)
      if (formData.email === 'admin@gmail.com' && formData.password === 'admin-123') {
        console.log('🔐 Connexion admin locale réussie');
        
        // Stocker dans localStorage pour persister la session admin
        localStorage.setItem('adminSession', JSON.stringify({
          isAdmin: true,
          email: 'admin@gmail.com',
          loginTime: new Date().toISOString()
        }));
        
        // Rediriger vers la page admin
        navigate('/admin');
        // // alert('👑 Connexion administrateur réussie !');
        setLoading(false);
        return;
      }

      // Vérifier si c'est un email valide
      if (!formData.email.includes('@')) {
        setError('❌ Veuillez entrer un email valide');
        setLoading(false);
        return;
      }

      // 🔥 CONNEXION NORMALE AVEC FIREBASE (étudiants et enseignants)
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      console.log('Connexion réussie:', user);

      // Récupérer l'email de l'utilisateur
      const userEmail = user.email;
      
      // Déterminer le rôle basé sur l'email
      let role = 'etudiant';
      const adminEmails = ['admin@eduhaiti.com', 'superadmin@eduhaiti.com', 'admin@gmail.com'];
      
      if (adminEmails.includes(userEmail.toLowerCase())) {
        role = 'admin';
        localStorage.setItem('adminSession', JSON.stringify({
          isAdmin: true,
          email: userEmail,
          loginTime: new Date().toISOString()
        }));
      } else if (userEmail.includes('@enseignant') || userEmail.includes('prof') || userEmail.includes('teacher') || userEmail.includes('@prof-eduhaiti.com')) {
        role = 'enseignant';
      }

      console.log('Rôle utilisateur:', role);

      // Redirection selon le rôle
      switch (role) {
        case 'admin':
          navigate('/admin');
          // // alert('👑 Connexion administrateur réussie !');
          break;
          
        case 'enseignant':
          navigate('/dashboard-enseignant');
          // // alert('👨‍🏫 Connexion enseignant réussie !');
          break;
          
        default:
          navigate('/dashboard-etudiant');
          // alert('👨‍🎓 Connexion réussie ! Bienvenue sur EduHaïti.');
          break;
      }

    } catch (error) {
      console.error('Erreur complète:', error);
      
      // Messages d'erreur Firebase personnalisés
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          setError('❌ Email ou mot de passe incorrect. Veuillez réessayer.');
          break;
        case 'auth/too-many-requests':
          setError('⚠️ Trop de tentatives. Veuillez réessayer plus tard.');
          break;
        case 'auth/user-disabled':
          setError('⚠️ Ce compte a été désactivé. Contactez l\'administrateur.');
          break;
        default:
          setError('❌ Une erreur est survenue. Veuillez réessayer plus tard.');
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
            <h2>Connexion</h2>
            <span className="badge">480/450</span>
          </div>

          <div className="auth-body">
            <p className="welcome-text">Bienvenue !</p>
            <p className="sub-text">Connectez-vous à votre compte</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
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