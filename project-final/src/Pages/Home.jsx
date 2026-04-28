import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="app-container">
      {/* ========== NAVBAR ========== */}
      <header className="navbar">
        <Link to="/" className="logo">🇭🇹 EduHaïti</Link>
        
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/cours">Cours</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="auth">
          <Link to="/connexion">
            <button className="btn login">Connexion</button>
          </Link>
          <Link to="/createaccount">
            <button className="btn register">S'inscrire</button>
          </Link>
        </div>
      </header>

      {/* ========== BOUTONS DASHBOARDS ========== */}
      <div className="dashboard-buttons">
        <Link to="/dashboard-enseignant">
          <button className="btn dashboard-btn enseignant-btn">
            👨‍🏫 Dashboard Enseignant
          </button>
        </Link>
        <Link to="/dashboard-etudiant">
          <button className="btn dashboard-btn etudiant-btn">
            👨‍🎓 Dashboard Étudiant
          </button>
        </Link>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="hero-left">
          <h1>Apprendre, enseigner,<br />changer l'avenir d'Haïti.</h1>
          <p>
            Une plateforme de cours en ligne pour les enseignants
            et apprenants haïtiens. Vidéos, quiz, certificats.
          </p>
          <div className="hero-buttons">
            <Link to="/createaccount">
              <button className="btn orange">Commencer gratuitement</button>
            </Link>
            <Link to="/cours">
              <button className="btn light">Voir les cours →</button>
            </Link>
          </div>
        </div>
        
        <div className="hero-right">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=350&fit=crop"
            alt="Étudiants qui apprennent ensemble"
            className="hero-image"
          />
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="stats">
        <div>
          <h2>500+</h2>
          <p>Cours disponibles</p>
        </div>
        <div>
          <h2>1200+</h2>
          <p>Étudiants actifs</p>
        </div>
        <div>
          <h2>15 000+</h2>
          <p>Heures de cours</p>
        </div>
        <div>
          <h2>95%</h2>
          <p>Taux de satisfaction</p>
        </div>
      </section>

      {/* ========== COURS SECTION ========== */}
      <section className="courses">
        <h2>📚 Cours en vedette</h2>
        <div className="course-grid">
          <div className="course-card">
            <div className="course-img math-img"></div>
            <h3>Mathématiques</h3>
            <p>Algèbre, géométrie, calcul</p>
            <Link to="/cours">
              <button>Voir cours →</button>
            </Link>
          </div>
          <div className="course-card">
            <div className="course-img french-img"></div>
            <h3>Français</h3>
            <p>Grammaire, littérature, expression</p>
            <Link to="/cours">
              <button>Voir cours →</button>
            </Link>
          </div>
          <div className="course-card">
            <div className="course-img science-img"></div>
            <h3>Sciences</h3>
            <p>Physique, chimie, biologie</p>
            <Link to="/cours">
              <button>Voir cours →</button>
            </Link>
          </div>
          <div className="course-card">
            <div className="course-img history-img"></div>
            <h3>Histoire d'Haïti</h3>
            <p>De Toussaint à nos jours</p>
            <Link to="/cours">
              <button>Voir cours →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-left">
          <h3>🇭🇹 EduHaïti</h3>
          <p>La plateforme d'apprentissage pour un Haïti meilleur</p>
        </div>
        <div className="footer-links">
          <Link to="/cours">Cours</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
          <a href="#">Politique de confidentialité</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;