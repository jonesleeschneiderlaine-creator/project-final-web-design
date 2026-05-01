import StatCard from "@/components/shared/StatCard";
import CourseCard from "@/components/shared/CourseCard";
import { teacherStats, teacherCourses } from "@/lib/mockData";
import "./dashboardEns.css"

const DashboardEnsHome = () => {
  return (
    <div className="dashboard-enseignant-home">
      <header className="dashboard-header">
        <p className="subtitle">Bienvenue, Dr. Dubois ! 👋</p>
        <h1>Tableau de bord enseignant</h1>
        <p className="description">
          Suivez vos cours, vos étudiants et vos performances globales.
        </p>
      </header>

      <section className="stats-grid">
        <StatCard
          icon="📚"
          label="Cours publiés"
          value={teacherStats.coursPubies}
          color="blue"
        />
        <StatCard
          icon="👥"
          label="Étudiants inscrits"
          value={teacherStats.etudiants}
          color="green"
        />
        <StatCard
          icon="📊"
          label="Taux de complétion"
          value={teacherStats.tauxCompletion}
          color="orange"
        />
        <StatCard
          icon="⭐"
          label="Satisfaction"
          value={teacherStats.satisfaction}
          color="purple"
        />
      </section>

      <section className="cards-section">
        <div className="section-header">
          <div>
            <h2>Mes cours les plus populaires</h2>
            <p>Vos 3 meilleurs cours cette session.</p>
          </div>
        </div>

        <div className="course-grid">
          {teacherCourses.map((course, idx) => (
            <article key={course.id} className={`teacher-course-card ${["blue", "orange", "green"][idx]}`}>
              <h3>{course.title}</h3>
              <p className="course-info">👥 {course.students} étudiants</p>
              <p className="course-info">📈 {course.progress}% de complétion</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardEnsHome
