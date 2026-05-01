import "./StatCard.css"

const StatCard = ({ icon, label, value, color = "blue" }) => {
  const colorClass = `stat-card-${color}`

  return (
    <article className={`stat-card ${colorClass}`}>
      {icon && <span className="stat-icon">{icon}</span>}
      <div>
        <p className="stat-label">{label}</p>
        <strong className="stat-value">{value}</strong>
      </div>
    </article>
  )
}

export default StatCard
