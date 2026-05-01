import "./CertificateCard.css"

const CertificateCard = ({ title, date, icon, onDownload }) => {
  return (
    <article className="certificate-card">
      <div className="certificate-top">
        <div className="certificate-icon">{icon}</div>
        <button className="download-btn" onClick={onDownload}>
          Télécharger
        </button>
      </div>

      <h3>{title}</h3>
      <p className="certificate-date">Obtenu le : {date}</p>
    </article>
  )
}

export default CertificateCard