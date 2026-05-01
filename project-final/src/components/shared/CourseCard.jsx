import "./CourseCard.css"

const CourseCard = ({
  title,
  instructor,
  progress,
  status = "En cours",
  variant = "default"
}) => {
  const statusClass =
    status === "Terminé"
      ? "green"
      : status === "Non commencé"
      ? "gray"
      : "orange"

  return (
    <article className={`course-card course-${variant}`}>
      
      <div className="course-header">
        <span className={`course-status status-${statusClass}`}>
          {status}
        </span>
      </div>

      <h3>{title}</h3>

      {instructor && (
        <p className="course-instructor">{instructor}</p>
      )}

      {progress !== undefined && (
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-text">{progress}% terminé</p>
        </div>
      )}

    </article>
  )
}

export default CourseCard