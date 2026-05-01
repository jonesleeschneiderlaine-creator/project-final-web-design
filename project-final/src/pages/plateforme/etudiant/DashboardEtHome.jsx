import StatCard from "@components/shared/StatCard"
import CourseCard from "@components/shared/CourseCard"
import { studentStats, studentCourses } from "@lib/mockData"
import { useAuth } from "@hooks/useAuth"
import "./dashboardEt.css"

const DashboardEtHome = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard-etudiant-home">

      <header className="dashboard-header">
        <div className="header-top">
          <div>
            <p className="subtitle">Bonjour, {user?.name || "Étudiant"} 👋</p>
            <h1>Tableau de bord</h1>
          </div>

          <div className="profile-mini">
            <div className="avatar">
              {user?.name?.charAt(0) || "E"}
            </div>
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Rechercher un cours..." />
        </div>

        <p className="description">
          Suivi de progression et activités récentes
        </p>
      </header>

      <section className="stats-grid">
        <StatCard icon="📚" label="Cours en cours" value={studentStats.coursesEnCours} />
        <StatCard icon="✅" label="Complétés" value={studentStats.coursesTermines} />
        <StatCard icon="⏱️" label="Heures" value={studentStats.heuresApprentissage} />
        <StatCard icon="⭐" label="Score" value={studentStats.scoreMoyen} />
      </section>

      <section className="cards-section">
        <h2>Mes cours</h2>

        <div className="course-grid">
          {studentCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default DashboardEtHome