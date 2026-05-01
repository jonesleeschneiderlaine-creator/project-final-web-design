import "./CourseCard.css"

const CourseCard = ({ title, instructor, progress, status = "En cours", variant = "default" }) => {
  const getStatusColor = () => {
    switch (status) {
      case "En cours":
        return "orange"
      case "Terminé":
        return "green"
      case "Non commencé":
        return "gray"
      default:
        return "blue"
    }
  }

  return (
    <article className={`course-card course-card-${variant}`}>
      <div className="course-header">
        <span className={`course-status status-${getStatusColor()}`}>{status}</span>
      </div>
      <h3>{title}</h3>
      {instructor && <p className="course-instructor">{instructor}</p>}
      {progress !== undefined && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">{progress}% terminé</p>
        </div>
      )}
    </article>
  )
}

export default CourseCard
