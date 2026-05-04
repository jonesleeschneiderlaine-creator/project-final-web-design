import { Link } from "react-router-dom"
import "./header.css"


const Header = () => {
  return (
    <header className="navbar">
        <Link to="/" className="logo">🇭🇹 EduHaïti</Link>
        
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/plateforme/cours">Cours</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="auth">
          <Link to="/connexion">
            <button className="btn login">Connexion</button>
          </Link>
          <Link to="/inscription">
            <button className="btn register">S'inscrire</button>
          </Link>
        </div>
      </header>
  )
}

export default Header
