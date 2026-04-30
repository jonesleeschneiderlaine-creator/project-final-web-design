import { useState } from "react"
import "./dashboardEt.css"

const DashboardEt = () => {
  const [view, setView] = useState("home")

  return (
    <div className="dashboard">

      <h1>Dashboard Étudiant</h1>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={() => setView("courses")}>Mes cours</button>
        <button onClick={() => setView("progress")}>Progression</button>
        <button onClick={() => setView("certificates")}>Certificats</button>
        <button onClick={() => setView("settings")}>Paramètres</button>
      </div>

      {/* ZONE DYNAMIQUE */}
      <div className="content">

        {view === "home" && <p>Bienvenue dans ton espace étudiant</p>}

        {view === "courses" && (
          <div>
            <h3>Mes cours</h3>
            <p>Liste simulée des cours</p>
          </div>
        )}

        {view === "progress" && (
          <div>
            <h3>Progression</h3>
            <p>Barre de progression simulée</p>
          </div>
        )}

        {view === "certificates" && (
          <div>
            <h3>Certificats</h3>
            <p>Aucun certificat pour le moment</p>
          </div>
        )}

        {view === "settings" && (
          <div>
            <h3>Paramètres</h3>
            <p>Profil étudiant</p>
          </div>
        )}

      </div>

    </div>
  )
}

export default DashboardEt