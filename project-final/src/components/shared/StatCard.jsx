import "./StatCard.css"

const StatCard = ({ icon, label, value, color = "blue" }) => {
  return (
    <article className={`stat-card stat-${color}`}>
      {icon && <span className="stat-icon">{icon}</span>}

      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <strong className="stat-value">{value}</strong>
      </div>
    </article>
  )
}

export default StatCard