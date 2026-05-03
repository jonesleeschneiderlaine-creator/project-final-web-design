import { Link } from "react-router-dom"
import "./footer.css"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>🇭🇹 EduHaïti</h3>
        <p>La plateforme d'apprentissage pour un Haïti meilleur</p>
      </div>
      <div className="footer-links">
        <Link to="/plateforme/cours">Cours</Link>
        <Link to="/apropos">À propos</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/politique-confidentialite">Politique de confidentialité</Link>
      </div>
    </footer>
  )
}

export default Footer
