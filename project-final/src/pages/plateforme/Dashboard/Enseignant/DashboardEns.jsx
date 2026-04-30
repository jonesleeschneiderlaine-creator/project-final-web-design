import { useState } from "react"
import "./dashboardEns.css"

const DashboardEns = () => {
  const [view, setView] = useState("home")

  return (
    <div className="dashboard">

      <h1>Dashboard Enseignant</h1>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={() => setView("create")}>Créer un cours</button>
        <button onClick={() => setView("stats")}>Statistiques</button>
        <button onClick={() => setView("courses")}>Mes cours</button>
      </div>

      {/* ZONE DYNAMIQUE */}
      <div className="content">

        {view === "home" && <p>Bienvenue dans ton espace enseignant</p>}

        {view === "create" && (
          <div>
            <h3>Créer un cours</h3>
            <p>Formulaire simulé</p>
          </div>
        )}

        {view === "stats" && (
          <div>
            <h3>Statistiques</h3>
            <p>Graphiques simulés</p>
          </div>
        )}

        {view === "courses" && (
          <div>
            <h3>Mes cours</h3>
            <p>Liste des cours publiés</p>
          </div>
        )}

      </div>

    </div>
  )
}

export default DashboardEns