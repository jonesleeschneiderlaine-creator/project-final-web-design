import "./dashboardEt.css"

const Progression = () => {
  return (
    <div className="student-page">
      <header className="page-header">
        <h2>Ma progression</h2>
        <p>Suivez votre évolution d'apprentissage.</p>
      </header>

      <div className="progress-card">
        <h3>Progression globale</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "75%" }} />
        </div>
        <p className="progress-text">75% de tous vos cours complétés</p>
      </div>

      <section className="section">
        <h3>Objectifs récents</h3>
        <ul className="list-card">
          <li>✅ Terminer le quiz de Python</li>
          <li>📝 Visionner la leçon d'Algèbre</li>
          <li>🏆 Télécharger le certificat</li>
          <li>⭐ Laisser un avis sur le cours</li>
        </ul>
      </section>
    </div>
  )
}

export default Progression
