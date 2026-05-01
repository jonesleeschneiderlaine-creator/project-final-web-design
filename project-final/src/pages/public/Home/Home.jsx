import { Link, useNavigate } from "react-router-dom"
import "./home.css"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>EduHaïti</h2>
        </div>
        <div className="navbar-links">
          <Link to="/apropos">À Propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>L'éducation de qualité pour un avenir meilleur</h1>
          <p>
            EduHaïti accompagne les élèves, étudiants et professionnels haïtiens avec des cours en ligne, 
            adaptés à leur besoin. Vidéos, quiz, certificats.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/connexion")}>
              Se connecter
            </button>
            <button className="btn-secondary" onClick={() => navigate("/inscription")}>
              S'inscrire
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-box">
            <span>📚</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Cours de qualité</h3>
          <p>Des contenus rigoureux enseignés par des professionnels</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Accessible à tous</h3>
          <p>Adaptable à votre horaire, sur tous vos appareils</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Certificats</h3>
          <p>Gagnez des certificats reconnus en terminant les cours</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <strong>500+</strong>
          <span>Cours disponibles</span>
        </div>
        <div className="stat">
          <strong>50+</strong>
          <span>Enseignants</span>
        </div>
        <div className="stat">
          <strong>95%</strong>
          <span>Satisfaction</span>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 EduHaïti. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default Home
