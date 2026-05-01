import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import "./sidebar.css"

const Sidebar = () => {
  const { role, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/connexion")
  }

  return (
    <aside className="sidebar">

      {role === "etudiant" && (
        <>
          <h2>Étudiant</h2>

          <NavLink to="/plateforme/etudiant" end>
            Dashboard
          </NavLink>

          <NavLink to="/plateforme/etudiant/cours">
            Mes cours
          </NavLink>

          <NavLink to="/plateforme/etudiant/progression">
            Progression
          </NavLink>

          <NavLink to="/plateforme/etudiant/certificats">
            Certificats
          </NavLink>

          <NavLink to="/plateforme/parametres">
            Paramètres
          </NavLink>

          <hr />
        </>
      )}

      {role === "enseignant" && (
        <>
          <h2>Enseignant</h2>

          <NavLink to="/plateforme/enseignant">
            Dashboard
          </NavLink>

          <NavLink to="/plateforme/enseignant/cours">
            Mes cours
          </NavLink>

          <NavLink to="/plateforme/enseignant/create">
            Créer cours
          </NavLink>

          <NavLink to="/plateforme/enseignant/stats">
            Statistiques
          </NavLink>

          <NavLink to="/plateforme/parametres">
            Paramètres
          </NavLink>

          <hr />
        </>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Déconnexion
      </button>

    </aside>
  )
}

export default Sidebar