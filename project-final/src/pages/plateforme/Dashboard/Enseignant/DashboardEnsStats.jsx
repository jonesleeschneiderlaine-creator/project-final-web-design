import StatCard from "../../../../components/shared/StatCard"
import { teacherStats2 } from "../../../../lib/mockData"
import "./dashboardEns.css"

const DashboardEnsStats = () => {
  return (
    <div className="dashboard-enseignant-page">
      <header className="page-header">
        <h2>Statistiques détaillées</h2>
        <p>Analyse complète de vos performances.</p>
      </header>

      <section className="stats-grid">
        <StatCard
          icon="👁️"
          label="Vues totales"
          value={teacherStats2.vues}
          color="blue"
        />
        <StatCard
          icon="📈"
          label="Croissance"
          value={teacherStats2.croissance}
          color="green"
        />
        <StatCard
          icon="👥"
          label="Étudiants"
          value={teacherStats2.etudiants}
          color="orange"
        />
        <StatCard
          icon="✅"
          label="Taux de complétion"
          value={teacherStats2.tauxCompletion}
          color="purple"
        />
      </section>

      <section className="chart-section">
        <h3>Graphiques (à développer)</h3>
        <p style={{ color: "#6b7280" }}>Section réservée pour l'implémentation de graphiques Chart.js</p>
      </section>
    </div>
  )
}

export default DashboardEnsStats
