import { teacherCourses } from "@/lib/mockData";
import "./dashboardEns.css"

const DashboardEnsCours = () => {
  return (
    <div className="dashboard-enseignant-page">
      <header className="page-header">
        <h2>Mes cours gérés</h2>
        <p>Gérez et modifiez vos cours.</p>
      </header>

      <button className="primary-button">+ Créer un nouveau cours</button>

      <div className="table-container">
        <div className="table-card">
          <div className="table-row header">
            <span>Titre du cours</span>
            <span>Étudiants</span>
            <span>Progression</span>
            <span>Actions</span>
          </div>
          {teacherCourses.map((course) => (
            <div key={course.id} className="table-row">
              <span className="course-title">{course.title}</span>
              <span>{course.students}</span>
              <span className="progress-inline">{course.progress}%</span>
              <span className="actions">
                <button className="btn-sm">Éditer</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardEnsCours
