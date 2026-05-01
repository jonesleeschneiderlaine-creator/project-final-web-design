import "./ProgressItem.css"

const ProgressItem = ({ title, description, value }) => {
  return (
    <article className="progress-item">
      <div className="progress-header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        />
      </div>

      <span className="progress-value">{value}%</span>
    </article>
  )
}

export default ProgressItem