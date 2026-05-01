import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import "./auth.css"

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [role, setRole] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (!role) {
      alert("Veuillez sélectionner votre rôle")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    // TODO: Connecter à la base de données
    console.log("Inscription:", { role, ...formData })
    
    // Sauvegarder le rôle dans le contexte
    login({ role })
    
    // Pour l'instant, diriger vers le dashboard approprié
    if (role === "etudiant") {
      navigate("/plateforme")
    } else {
      navigate("/plateforme/enseignant")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>EduHaïti</h1>
          <h2>Créer un compte</h2>
          <p>Rejoignez notre communauté d'apprenants</p>
        </div>

        <form onSubmit={handleSignup}>
          {/* Sélection du rôle */}
          <div className="role-selector">
            <label className="role-option">
              <input
                type="radio"
                value="etudiant"
                checked={role === "etudiant"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="role-label">
                <span className="role-icon">👨‍🎓</span>
                Étudiant
              </span>
            </label>
            <label className="role-option">
              <input
                type="radio"
                value="enseignant"
                checked={role === "enseignant"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="role-label">
                <span className="role-icon">👨‍🏫</span>
                Enseignant
              </span>
            </label>
          </div>

          {/* Formulaire d'inscription */}
          <label>
            Nom complet
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jean Pierre"
              required
            />
          </label>

          <label>
            Adresse e-mail
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          <label>
            Confirmer le mot de passe
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          <label className="terms">
            <input type="checkbox" required />
            J'accepte les conditions d'utilisation
          </label>

          <button type="submit" className="btn-submit">
            Créer mon compte
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <button className="btn-google">
          <span>🔵</span> S'inscrire avec Google
        </button>

        <div className="auth-footer">
          <p>
            Vous avez déjà un compte ?{" "}
            <button
              type="button"
              onClick={() => navigate("/connexion")}
              className="link-button"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
