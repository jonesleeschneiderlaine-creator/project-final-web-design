import StatCard from "@/components/shared/StatCard";
import CourseCard from "@/components/shared/CourseCard";
import { studentStats, studentCourses } from "@/lib/mockData";
import "./dashboardEt.css"

const DashboardEtHome = () => {
  return (
    <div className="dashboard-etudiant-home">
      <header className="dashboard-header">
        <p className="subtitle">Bonjour, Jean ! 👋</p>
        <h1>Tableau de bord</h1>
        <p className="description">
          Voici vos statistiques de progression et vos activités récentes.
        </p>
      </header>

      <section className="stats-grid">
        <StatCard
          icon="📚"
          label="Cours en cours"
          value={studentStats.coursesEnCours}
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Cours complétés"
          value={studentStats.coursesTermines}
          color="green"
        />
        <StatCard
          icon="⏱️"
          label="Heures d'apprentissage"
          value={studentStats.heuresApprentissage}
          color="orange"
        />
        <StatCard
          icon="⭐"
          label="Score moyen"
          value={studentStats.scoreMoyen}
          color="purple"
        />
      </section>

      <section className="cards-section">
        <div className="section-header">
          <div>
            <h2>Mes cours</h2>
            <p>Reprenez rapidement vos dernières leçons.</p>
          </div>
        </div>

        <div className="course-grid">
          {studentCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              instructor={course.instructor}
              progress={course.progress}
              status={course.status}
              variant={course.variant || "default"}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardEtHome
