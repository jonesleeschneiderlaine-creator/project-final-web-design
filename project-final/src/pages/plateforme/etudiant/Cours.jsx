import CourseCard from "@components/shared/CourseCard"
import { studentCourses } from "@lib/mockData"
import "./dashboardEt.css"

const Cours = () => {
  return (
    <div>
      <h2>Mes cours</h2>

      <div className="course-grid">
        {studentCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  )
}

export default Cours