import { NavLink } from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>

      <NavLink to="/plateforme">
        Dashboard Étudiant
      </NavLink>

      <NavLink to="/plateforme/enseignant">
        Dashboard Enseignant
      </NavLink>

      <NavLink to="/plateforme/parametres">
        Paramètres
      </NavLink>
    </aside>
  )
}

export default Sidebar