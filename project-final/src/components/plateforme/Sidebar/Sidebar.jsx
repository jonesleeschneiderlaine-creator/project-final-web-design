import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "@hooks/useAuth"
import "./sidebar.css"

const Sidebar = () => {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/connexion")
  }

  const linkClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"

  return (
    <aside className="sidebar">

      <div className="sidebar-profile">
        <div className="avatar">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <p className="name">{user?.name}</p>
          <p className="role">{role}</p>
        </div>
      </div>

      {role === "etudiant" && (
        <nav>
          <h2>Étudiant</h2>

          <NavLink to="/plateforme" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/plateforme/cours" className={linkClass}>Cours</NavLink>
          <NavLink to="/plateforme/progression" className={linkClass}>Progression</NavLink>
          <NavLink to="/plateforme/certificats" className={linkClass}>Certificats</NavLink>
          <NavLink to="/plateforme/parametres" className={linkClass}>Paramètres</NavLink>
        </nav>
      )}

      {role === "enseignant" && (
        <nav>
          <h2>Enseignant</h2>

          <NavLink to="/plateforme/enseignant" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/plateforme/enseignant/cours" className={linkClass}>Cours</NavLink>
          <NavLink to="/plateforme/enseignant/create" className={linkClass}>Créer</NavLink>
          <NavLink to="/plateforme/enseignant/stats" className={linkClass}>Stats</NavLink>
          <NavLink to="/plateforme/parametres" className={linkClass}>Paramètres</NavLink>
        </nav>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Déconnexion
      </button>

    </aside>
  )
}

export default Sidebar