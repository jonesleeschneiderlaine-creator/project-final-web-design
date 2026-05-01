import CourseCard from "../../../../components/shared/CourseCard"
import { studentCourses } from "../../../../lib/mockData"
import "./dashboardEt.css"

const Cours = () => {
  return (
    <div className="student-page">
      <header className="page-header">
        <h2>Mes cours</h2>
        <p>Tous vos cours actifs et récents.</p>
      </header>

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
    </div>
  )
}

export default Cours

