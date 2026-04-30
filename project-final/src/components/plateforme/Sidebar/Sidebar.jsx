import { NavLink } from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <h2>Étudiant</h2>

      <NavLink to="/plateforme" end>
        Dashboard
      </NavLink>

      <NavLink to="/plateforme/cours">
        Mes cours
      </NavLink>

      <NavLink to="/plateforme/progression">
        Progression
      </NavLink>

      <NavLink to="/plateforme/certificats">
        Certificats
      </NavLink>

      <NavLink to="/plateforme/parametres">
        Paramètres
      </NavLink>

      <hr />

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

    </aside>
  )
}

export default Sidebar