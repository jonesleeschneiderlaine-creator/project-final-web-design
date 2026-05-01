import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import "./auth.css"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [role, setRole] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    if (!role) {
      alert("Veuillez sélectionner votre rôle")
      return
    }
    // TODO: Connecter à la base de données
    console.log("Connexion:", { role, email, password })
    
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
          <h2>Se connecter</h2>
          <p>Accédez à votre espace personnel</p>
        </div>

        <form onSubmit={handleLogin}>
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

          {/* Formulaire de connexion */}
          <label>
            Adresse e-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <a href="#" className="forgot-password">Mot de passe oublié ?</a>

          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <button className="btn-google">
          <span>🔵</span> Continuer avec Google
        </button>

        <div className="auth-footer">
          <p>
            Pas encore de compte ?{" "}
            <button
              type="button"
              onClick={() => navigate("/inscription")}
              className="link-button"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
