import "@/pages/plateforme/etudiant/dashboardEt.css"
import ProgressItem from "@/components/shared/ProgressItem"

const Progression = () => {
  const courseProgress = [
    {
      id: 1,
      title: "Algèbre linéaire",
      description: "72% complété — Prochain chapitre : vecteurs",
      value: 72,
    },
    {
      id: 2,
      title: "Python pour débutants",
      description: "88% complété — Préparez le quiz final",
      value: 88,
    },
    {
      id: 3,
      title: "Physique générale",
      description: "54% complété — Revoir les formules de mouvement",
      value: 54,
    },
  ]

  const goals = [
    "✅ Terminer le quiz de Python",
    "📝 Visionner la leçon d'Algèbre",
    "🏆 Télécharger le certificat",
    "⭐ Laisser un avis sur le cours",
  ]

  return (
    <div className="student-page">

      <header className="page-header">
        <h2>Ma progression</h2>
        <p>Suivez votre évolution d'apprentissage avec des objectifs clairs.</p>
      </header>

      <div className="progress-grid">
        <section className="progress-card summary-card">
          <div className="progress-card-header">
            <div>
              <h3>Progression globale</h3>
              <p>Votre rythme actuel d'apprentissage.</p>
            </div>
            <div className="progress-score">75%</div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "75%" }} />
          </div>

          <p className="progress-text">
            Vous avez complété 3 cours sur 4 en cours.
          </p>
        </section>

        <section className="progress-card detail-card">
          <h3>Parcours récents</h3>
          <div className="progress-list">
            {courseProgress.map((item) => (
              <ProgressItem
                key={item.id}
                title={item.title}
                description={item.description}
                value={item.value}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="section goals-section">
        <h3>Objectifs récents</h3>
        <ul className="task-list">
          {goals.map((goal) => (
            <li key={goal} className="task-card">
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}

export default Progression